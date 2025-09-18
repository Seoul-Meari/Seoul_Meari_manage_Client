import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AssetUsage } from '@/features/vr-contents/types';
import { CloseIcon, UploadCloudIcon } from '@/components/common/Icon';
import { Select } from '@/components/common/Select';

// 모달이 부모 컴포넌트로 전달할 데이터 타입 정의
export interface BundleUploadPayload {
  bundleFile: File;
  layoutFile: File;
  name: string;
  version: string;
  usage: AssetUsage;
  tags: string[];
  description: string;
}

interface UploadBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  // 성공적으로 폼이 제출되었을 때 호출될 콜백
  onSubmit: (payload: BundleUploadPayload) => void; 
}

const UploadBundleModal: React.FC<UploadBundleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // --- States for form fields ---
  const [bundleFile, setBundleFile] = useState<File | null>(null);
  const [layoutFile, setLayoutFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [usage, setUsage] = useState<AssetUsage>("historical");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundleFile || !layoutFile || !name || !version) {
      setError("에셋 번들 파일, 레이아웃 JSON, 이름, 버전은 필수 항목입니다.");
      return;
    }
    setError(null);

    const payload: BundleUploadPayload = {
      bundleFile,
      layoutFile,
      name,
      version,
      usage,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      description,
    };
    
    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">새 에셋 번들 업로드</h2>
            <p className="mt-1 text-sm text-gray-500">에셋 번들과 배치 정보를 서버에 등록합니다.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">에셋 번들 파일 <span className="text-red-500">*</span></label>
              <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                <div className="text-center">
                  <UploadCloudIcon className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-2 flex text-sm text-gray-600">
                    <label htmlFor="bundle-file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                      <span>파일 선택</span>
                      <input id="bundle-file-upload" name="bundle-file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, setBundleFile)} accept=".assetbundle,.bundle,.unity3d" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">{bundleFile ? bundleFile.name : ".assetbundle, .bundle"}</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">레이아웃 JSON <span className="text-red-500">*</span></label>
              <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                <div className="text-center">
                  <UploadCloudIcon className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-2 flex text-sm text-gray-600">
                    <label htmlFor="layout-file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                      <span>파일 선택</span>
                      <input id="layout-file-upload" name="layout-file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, setLayoutFile)} accept=".json" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">{layoutFile ? layoutFile.name : ".json"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bundle-name" className="block text-sm font-medium text-gray-700">번들 이름 <span className="text-red-500">*</span></label>
              <input type="text" id="bundle-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="예: 경복궁_주요_건물군"/>
            </div>
            <div>
              <label htmlFor="bundle-version" className="block text-sm font-medium text-gray-700">버전 <span className="text-red-500">*</span></label>
              <input type="text" id="bundle-version" value={version} onChange={(e) => setVersion(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="예: 1.0.0"/>
            </div>
          </div>
          
          <div>
            <Select label="용도" value={usage} onChange={(v) => setUsage(v as AssetUsage)} options={[{ value: "historical", label: "역사" }, { value: "promo", label: "프로모션" }, { value: "both", label: "둘 다" }]} />
          </div>

          <div>
            <label htmlFor="bundle-tags" className="block text-sm font-medium text-gray-700">태그 (쉼표로 구분)</label>
            <input type="text" id="bundle-tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="예: palace, seoul, historical-site"/>
          </div>

          <div>
             <label htmlFor="bundle-desc" className="block text-sm font-medium text-gray-700">설명</label>
             <textarea id="bundle-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-gray-900" placeholder="이 번들에 포함된 에셋이나 주요 변경 사항에 대해 설명합니다."></textarea>
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">취소</button>
            <button type="submit" className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">업로드</button>
          </div>
        </form>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export default UploadBundleModal;