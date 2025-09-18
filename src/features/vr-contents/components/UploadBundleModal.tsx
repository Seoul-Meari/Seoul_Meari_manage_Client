import React, { useState } from 'react';

// 가정: 이 컴포넌트들은 프로젝트 내에 이미 존재합니다.
import ModalShell from '@/components/common/ModalShell';
import FileDropZone from '@/components/common/FileDropZone';
import { LabeledInput, LabeledTextarea, FormRow } from '@/components/common/FormField';
import ActionButton from '@/components/common/ActionButton';
import TagInput from '@/components/common/TagInput';
import { Select } from '@/components/common/Select';
import LayoutJsonExample from './LayoutJsonExample'; // JSON 예시 컴포넌트

// =================================================================
// 1. 타입 정의 (types.ts 등 별도 파일로 관리하는 것을 권장)
// =================================================================
export type AssetUsage = 'historical' | 'promo' | 'both';
export type AssetStatus = 'draft' | 'published' | 'archived';
export type AssetOS = 'android' | 'ios';

/**
 * 최종 업로드 완료 API 호출 시 onSubmit 콜백으로 부모 컴포넌트에 전달될 데이터 타입.
 * S3에 직접 업로드되는 번들 파일(File[])은 제외됩니다.
 */
export interface BundleFinalizePayload {
  uploadId: string;
  layoutFile: File;
  name: string;
  version: string;
  usage: AssetUsage;
  os: AssetOS;
  tags: string[];
  description: string;
}

/**
 * 이 모달 컴포넌트의 Props 타입.
 * onSubmit 콜백은 BundleFinalizePayload를 인자로 받습니다.
 */
interface UploadBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: BundleFinalizePayload) => void;
}

// =================================================================
// 2. API 클라이언트 함수 (api/bundleClient.ts 등 별도 파일로 분리 권장)
// =================================================================

/**
 * 백엔드에 Presigned URL 생성을 요청합니다.
 * @param fileInfos 업로드할 파일들의 이름과 타입 정보 배열
 * @returns { uploadId: string, urls: Array<{ fileName: string, url: string }> }
 */
async function getPresignedUrls(fileInfos: { fileName: string; fileType: string }[]) {
  const response = await fetch('/api/bundles/initiate-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files: fileInfos }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Presigned URL 생성에 실패했습니다.' }));
    throw new Error(errorData.message);
  }
  return response.json();
}

/**
 * Presigned URL을 사용해 단일 파일을 S3에 직접 업로드합니다.
 * @param url S3 Presigned URL
 * @param file 업로드할 File 객체
 */
async function uploadFileToS3(url: string, file: File) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });
  if (!response.ok) {
    throw new Error(`'${file.name}' 파일 업로드에 실패했습니다.`);
  }
}

/**
 * 모든 파일의 S3 업로드 완료 후, 백엔드에 최종 등록을 요청합니다.
 * @param payload FormData 객체 (layoutFile 포함)
 */
async function finalizeBundleUpload(payload: FormData) {
  const response = await fetch('/api/bundles/finalize-upload', {
    method: 'POST',
    body: payload,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '번들 최종 등록에 실패했습니다.' }));
    throw new Error(errorData.message);
  }
  return response.json();
}

// =================================================================
// 3. 리액트 컴포넌트
// =================================================================
const UploadBundleModal: React.FC<UploadBundleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // --- States ---
  // 파일 상태
  const [mainManifest, setMainManifest] = useState<File | null>(null);
  const [mainManifestText, setMainManifestText] = useState<File | null>(null);
  const [assetBundle, setAssetBundle] = useState<File | null>(null);
  const [assetBundleText, setAssetBundleText] = useState<File | null>(null);
  const [layoutFile, setLayoutFile] = useState<File | null>(null);

  // 메타데이터 상태
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [usage, setUsage] = useState<AssetUsage>('historical');
  const [os, setOs] = useState<AssetOS>('android');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');

  // UI 상태
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);

  // --- Handlers ---
  const resetAllStates = () => {
    setMainManifest(null);
    setMainManifestText(null);
    setAssetBundle(null);
    setAssetBundleText(null);
    setLayoutFile(null);
    setName('');
    setVersion('1.0.0');
    setUsage('historical');
    setOs('android');
    setTags('');
    setDescription('');
    setError(null);
    setIsUploading(false);
    setShowExample(false);
  };
  
  const handleClose = () => {
    resetAllStates();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allFiles = [mainManifest, mainManifestText, assetBundle, assetBundleText, layoutFile];
    if (allFiles.some((f) => !f) || !name || !version) {
      setError('모든 파일과 필수 정보(이름, 버전)를 입력해야 합니다.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // 1. Presigned URL 요청
      const bundleFiles = [mainManifest, mainManifestText, assetBundle, assetBundleText] as File[];
      const fileInfos = bundleFiles.map((f) => ({ fileName: f.name, fileType: f.type }));
      const { uploadId, urls } = await getPresignedUrls(fileInfos);

      // 2. S3로 병렬 업로드
      await Promise.all(
        urls.map((urlInfo: { fileName: string; url: string }) => {
          const fileToUpload = bundleFiles.find((f) => f.name === urlInfo.fileName);
          if (!fileToUpload) throw new Error(`업로드할 파일 '${urlInfo.fileName}'을 찾을 수 없습니다.`);
          return uploadFileToS3(urlInfo.url, fileToUpload);
        }),
      );

      // 3. 업로드 완료 등록
      const finalPayloadObject: Omit<BundleFinalizePayload, 'tags'> & { tags: string } = {
        uploadId,
        layoutFile: layoutFile as File,
        name,
        version,
        usage,
        os,
        tags: tags, // FormData에는 string으로 보내고, 부모 컴포넌트에는 배열로 보냄
        description,
      };

      const formData = new FormData();
      Object.entries(finalPayloadObject).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      await finalizeBundleUpload(formData);

      // 성공 처리: 부모 컴포넌트에는 타입에 맞는 객체 전달
      onSubmit({
        ...finalPayloadObject,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      handleClose();

    } catch (err: any) {
      setError(err.message || '업로드 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const buildExampleLayout = () => ({
    prefabs: [
      {
        id: "p-001",
        name: "Geunjeongjeon_Main_LOD2",
        sizeMB: 120.5,
        tags: ["main-hall", "lod2"],
      },
      {
        id: "p-002",
        name: "Geunjeongjeon_Stairs_LOD1",
        sizeMB: 45.7,
        tags: ["stairs", "stone"],
      },
    ],
    placementGroups: [
      {
        groupId: "pg-1",
        prefabId: "p-001",
        transforms: [
          {
            location: {
              latitude: 37.5796,
              longitude: 126.977,
              altitude: 20.0,
            },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
          },
        ],
      },
      {
        groupId: "pg-2",
        prefabId: "p-002",
        transforms: [
          {
            location: {
              latitude: 37.5796,
              longitude: 126.977,
              altitude: 15.0,
            },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
          },
        ],
      },
    ],
  });

  // --- Render ---
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title="새 에셋 번들 업로드"
      subtitle="Presigned URL 방식으로 파일을 S3에 직접 업로드합니다."
      maxWidthClassName="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border rounded-md bg-gray-50/50">
          <p className="text-sm font-semibold text-gray-700">1. 유니티 빌드 파일 (4개)</p>
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            <FileDropZone label="메인 매니페스트 번들" required inputId="main-manifest-upload" onChange={(f) => setMainManifest(f?.[0] || null)} placeholder="플랫폼 이름의 파일 (예: Android)" />
            <FileDropZone label="메인 매니페스트 텍스트" required inputId="main-manifest-text-upload" accept=".manifest" onChange={(f) => setMainManifestText(f?.[0] || null)} placeholder=".manifest 파일" />
            <FileDropZone label="에셋 번들 파일" required inputId="asset-bundle-upload" onChange={(f) => setAssetBundle(f?.[0] || null)} placeholder="실제 에셋 번들 (예: prefabs.assetbundle)" />
            <FileDropZone label="에셋 번들 텍스트" required inputId="asset-bundle-text-upload" accept=".manifest" onChange={(f) => setAssetBundleText(f?.[0] || null)} placeholder=".manifest 파일" />
          </div>
        </div>

        <div className="p-3 border rounded-md bg-gray-50/50">
          <p className="text-sm font-semibold text-gray-700">2. 레이아웃 및 메타데이터</p>
          <div className="pt-2 space-y-4">
             <FileDropZone label="레이아웃 JSON" required inputId="layout-file-upload" accept=".json" onChange={(f) => setLayoutFile(f?.[0] || null)} placeholder="배치 정보가 담긴 .json 파일" />
            <FormRow>
              <LabeledInput label="번들 이름" required id="bundle-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 경복궁_주요_건물군" />
              <LabeledInput label="버전" required id="bundle-version" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="예: 1.0.0" />
            </FormRow>
            <FormRow>
                <Select label="용도" value={usage} onChange={(v) => setUsage(v as AssetUsage)} options={[{ value: 'historical', label: '역사' }, { value: 'promo', label: '프로모션' }, { value: 'both', label: '둘 다' }]} />
                <Select label="OS" value={os} onChange={(v) => setOs(v as AssetOS)} options={[{ value: 'android', label: 'Android' }, { value: 'ios', label: 'iOS' }]} />
            </FormRow>
            <TagInput value={tags} onChange={setTags} />
            <LabeledTextarea label="설명" id="bundle-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="이 번들에 포함된 에셋이나 주요 변경 사항에 대해 설명합니다." />
          </div>
        </div>
        
        {error && <p className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{error}</p>}
        
        <div className="pt-2">
          <ActionButton type="button" variant="subtle" onClick={() => setShowExample((s) => !s)}>
            {showExample ? '레이아웃 JSON 예시 숨기기' : '레이아웃 JSON 예시 보기'}
          </ActionButton>
        </div>
        
        {showExample && (
          <LayoutJsonExample dataBuilder={buildExampleLayout} initialCase="snake" />
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <ActionButton type="button" variant="secondary" onClick={handleClose} disabled={isUploading}>
            취소
          </ActionButton>
          <ActionButton type="submit" disabled={isUploading}>
            {isUploading ? '업로드 중...' : '업로드 등록'}
          </ActionButton>
        </div>
      </form>
    </ModalShell>
  );
};

export default UploadBundleModal;