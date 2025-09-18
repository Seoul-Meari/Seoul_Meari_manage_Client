import React from 'react';
import FileDropZone from '@/components/common/FileDropZone';

// =================================================================
// 파츠: 유니티 빌드 파일 (4개)
// =================================================================
interface BundleFilesFieldsProps {
  mainManifest: File | null;
  mainManifestText: File | null;
  assetBundle: File | null;
  assetBundleText: File | null;
  setMainManifest: (f: File | null) => void;
  setMainManifestText: (f: File | null) => void;
  setAssetBundle: (f: File | null) => void;
  setAssetBundleText: (f: File | null) => void;
}

const BundleFilesFields: React.FC<BundleFilesFieldsProps> = ({
  setMainManifest,
  setMainManifestText,
  setAssetBundle,
  setAssetBundleText,
}) => {
  return (
    <div className="p-3 border rounded-md bg-gray-50/50">
      <p className="text-sm font-semibold text-gray-700">1. 유니티 빌드 파일 (4개)</p>
      <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
        <FileDropZone
          label="메인 매니페스트 번들"
          required
          inputId="main-manifest-upload"
          onChange={(f) => setMainManifest(f?.[0] || null)}
          placeholder="플랫폼 이름의 파일 (예: Android)"
        />
        <FileDropZone
          label="메인 매니페스트 텍스트"
          required
          inputId="main-manifest-text-upload"
          accept=".manifest"
          onChange={(f) => setMainManifestText(f?.[0] || null)}
          placeholder=".manifest 파일"
        />
        <FileDropZone
          label="에셋 번들 파일"
          required
          inputId="asset-bundle-upload"
          onChange={(f) => setAssetBundle(f?.[0] || null)}
          placeholder="실제 에셋 번들 (예: prefabs.assetbundle)"
        />
        <FileDropZone
          label="에셋 번들 텍스트"
          required
          inputId="asset-bundle-text-upload"
          accept=".manifest"
          onChange={(f) => setAssetBundleText(f?.[0] || null)}
          placeholder=".manifest 파일"
        />
      </div>
    </div>
  );
};

export default BundleFilesFields;