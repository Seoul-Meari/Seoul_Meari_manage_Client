import { useState } from 'react';
import type { AssetOS, AssetUsage, BundleFinalizePayload } from '../types';
import { finalizeBundleUpload, getPresignedUrls, uploadFileToS3 } from '@/api/vrContentAPI';

// =================================================================
// 업로드 폼 상태/핸들러 훅
// =================================================================
export function useBundleUploadForm(onSubmit: (payload: BundleFinalizePayload) => void, onClose: () => void) {
  // --- 파일 상태 ---
  const [mainManifest, setMainManifest] = useState<File | null>(null);
  const [assetBundle, setAssetBundle] = useState<File | null>(null);
  const [layoutFile, setLayoutFile] = useState<File | null>(null);

  // --- 메타데이터 상태 ---
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [usage, setUsage] = useState<AssetUsage>('historical');
  const [os, setOs] = useState<AssetOS>('android');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');

  // --- UI 상태 ---
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);

  const resetAllStates = () => {
    setMainManifest(null);
    setAssetBundle(null);
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
    const allFiles = [mainManifest, assetBundle, layoutFile];
    if (allFiles.some((f) => !f) || !name || !version) {
      setError('모든 파일과 필수 정보(이름, 버전)를 입력해야 합니다.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // 1) Presigned URL 요청
      const bundleFiles = [mainManifest!, assetBundle!];
      const fileInfos = bundleFiles.map((f) => ({ fileName: f.name, fileType: f.type }));
      const { uploadId, urls } = await getPresignedUrls(fileInfos);

      // 2) S3 병렬 업로드
      await Promise.all(
        urls.map(({ fileName, url }) => {
          const fileToUpload = bundleFiles.find((f) => f.name === fileName);
          if (!fileToUpload) throw new Error(`업로드할 파일 '${fileName}'을 찾을 수 없습니다.`);
          return uploadFileToS3(url, fileToUpload);
        }),
      );

      // 3) 최종 등록
      const finalPayloadObject: Omit<BundleFinalizePayload, 'tags'> & { tags: string } = {
        uploadId,
        layoutFile: layoutFile as File,
        name,
        version,
        usage,
        os,
        tags, // 서버에는 문자열로
        description,
      };

      const formData = new FormData();
      Object.entries(finalPayloadObject).forEach(([key, value]) => formData.append(key, value as Blob | string));
      await finalizeBundleUpload(formData);

      // 부모로 알림 (tags 배열 변환)
      onSubmit({
        ...finalPayloadObject,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      } as unknown as BundleFinalizePayload);

      handleClose();
    } catch (err: any) {
      setError(err.message || '업로드 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    // 상태
    mainManifest, assetBundle, layoutFile,
    name, version, usage, os, tags, description,
    isUploading, error, showExample,

    // setter
    setMainManifest, setAssetBundle, setLayoutFile,
    setName, setVersion, setUsage, setOs, setTags, setDescription,
    setShowExample,

    // 핸들러
    handleSubmit, handleClose,
  };
}