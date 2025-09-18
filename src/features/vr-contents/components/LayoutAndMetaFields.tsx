import React from 'react';
import FileDropZone from '@/components/common/FileDropZone';
import { LabeledInput, LabeledTextarea, FormRow } from '@/components/common/FormField';
import { Select } from '@/components/common/Select';
import TagInput from '@/components/common/TagInput';
import { AssetOS, AssetUsage } from '../types';

// =================================================================
// 레이아웃 및 메타데이터
// =================================================================
interface LayoutAndMetaFieldsProps {
  layoutFile: File | null;
  setLayoutFile: (f: File | null) => void;

  name: string;
  setName: (v: string) => void;

  version: string;
  setVersion: (v: string) => void;

  usage: AssetUsage;
  setUsage: (v: AssetUsage) => void;

  os: AssetOS;
  setOs: (v: AssetOS) => void;

  tags: string;
  setTags: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;
}

const LayoutAndMetaFields: React.FC<LayoutAndMetaFieldsProps> = ({
  setLayoutFile,
  name, setName,
  version, setVersion,
  usage, setUsage,
  os, setOs,
  tags, setTags,
  description, setDescription,
}) => {
  return (
    <div className="p-3 border rounded-md bg-gray-50/50">
      <p className="text-sm font-semibold text-gray-700">2. 레이아웃 및 메타데이터</p>
      <div className="pt-2 space-y-4">
        <FileDropZone
          label="레이아웃 JSON"
          required
          inputId="layout-file-upload"
          accept=".json"
          onChange={(f) => setLayoutFile(f?.[0] || null)}
          placeholder="배치 정보가 담긴 .json 파일"
        />

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

        <FormRow>
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
        </FormRow>

        <TagInput value={tags} onChange={setTags} />

        <LabeledTextarea
          label="설명"
          id="bundle-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="이 번들에 포함된 에셋이나 주요 변경 사항에 대해 설명합니다."
        />
      </div>
    </div>
  );
};

export default LayoutAndMetaFields;