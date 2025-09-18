import React, { useState } from 'react';
import ModalShell from '@/components/common/ModalShell';
import FileDropZone from '@/components/common/FileDropZone';
import { LabeledInput, LabeledTextarea, FormRow } from '@/components/common/FormField';
import ActionButton from '@/components/common/ActionButton';
import TagInput from '@/components/common/TagInput';
import { Select } from '@/components/common/Select';

import { AssetUsage, AssetOS, BundleUploadPayload } from '@/features/vr-contents/types';
import LayoutJsonExample from './LayoutJsonExample';

interface UploadBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: BundleUploadPayload) => void;
}

const UploadBundleModal: React.FC<UploadBundleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // --- States ---
  const [bundleFile, setBundleFile] = useState<File[] | null>(null);
  const [layoutFile, setLayoutFile] = useState<File[] | null>(null);
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [usage, setUsage] = useState<AssetUsage>('historical');
  const [os, setOs] = useState<AssetOS>('android'); // ✅ OS 상태 추가
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [showExample, setShowExample] = useState(false);

  // --- Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundleFile || !layoutFile || !name || !version) {
      setError('에셋 번들 파일, 레이아웃 JSON, 이름, 버전은 필수 항목입니다.');
      return;
    }
    setError(null);
    const payload: BundleUploadPayload = {
      bundleFile,
      layoutFile,
      name,
      version,
      usage,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      description,
      os,
    };
    onSubmit(payload);
    onClose();
  };

  // --- Example data builder (prefabs만 포함 가정) ---
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

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="새 에셋 번들 업로드"
      subtitle="에셋 번들과 배치 정보를 서버에 등록합니다."
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormRow>
          <FileDropZone
            label="에셋 번들 파일"
            isMultiple={true}
            required
            inputId="bundle-file-upload"
            accept=""
            onChange={setBundleFile}
            placeholder="assetbundle, manifest"
          />
          <FileDropZone
            label="레이아웃 JSON"
            required
            inputId="layout-file-upload"
            accept=".json"
            onChange={setLayoutFile}
            placeholder=".json"
          />
        </FormRow>

        <FormRow>
          <LabeledInput
            label="번들 이름"
            required
            id="bundle-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 경복궁_주요_건물군"
          />
          <LabeledInput
            label="버전"
            required
            id="bundle-version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="예: 1.0.0"
          />
        </FormRow>

        {/* 용도 선택 */}
        <Select
          label="용도"
          value={usage}
          onChange={(v) => setUsage(v as AssetUsage)}
          options={[
            { value: 'historical', label: '역사' },
            { value: 'promo', label: '프로모션' },
            { value: 'both', label: '둘 다' },
          ]}
        />

        <Select
          label="OS"
          value={os}
          onChange={(v) => setOs(v as AssetOS)}
          options={[
            { value: 'android', label: 'Android' },
            { value: 'ios', label: 'iOS' },
          ]}
        />

        <TagInput value={tags} onChange={setTags} />

        <LabeledTextarea
          label="설명"
          id="bundle-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="이 번들에 포함된 에셋이나 주요 변경 사항에 대해 설명합니다."
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="pt-2">
          <ActionButton
            type="button"
            variant="subtle"
            onClick={() => setShowExample((s) => !s)}
            aria-expanded={showExample}
            aria-controls="layout-example"
          >
            {showExample ? '레이아웃 JSON 예시 숨기기' : '레이아웃 JSON 예시 보기'}
          </ActionButton>
        </div>

        {showExample && (
          <div id="layout-example">
            {/* 레이아웃 예시는 배치 정보만 보여주므로 OS는 포함하지 않음 */}
            <LayoutJsonExample dataBuilder={buildExampleLayout} initialCase="snake" />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <ActionButton type="button" variant="secondary" onClick={onClose}>
            취소
          </ActionButton>
          <ActionButton type="submit">업로드</ActionButton>
        </div>
      </form>
    </ModalShell>
  );
};

export default UploadBundleModal;