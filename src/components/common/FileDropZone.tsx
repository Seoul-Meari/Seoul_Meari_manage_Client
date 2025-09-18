import React, { useState, useCallback } from 'react';
import { DummyUploadCloudIcon } from './Icon';

interface FileDropZoneProps {
  label: string;
  required?: boolean;
  inputId: string;
  accept?: string;
  isMultiple?: boolean;

  onChange: (files: File[]) => void;
  placeholder?: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ label, required, inputId, accept, isMultiple=false ,onChange, placeholder }) => {
  // State to hold information about the selected files (e.g., "3 files selected")
  const [fileInfo, setFileInfo] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to an array and pass it to the parent
      const filesArray = Array.from(e.target.files);
      onChange(filesArray);
      setFileInfo(`${filesArray.length}개의 파일 선택됨`);
    } else {
      onChange([]);
      setFileInfo(null);
    }
  }, [onChange]);

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
        <div className="text-center">
          <DummyUploadCloudIcon className="mx-auto h-10 w-10 text-gray-400" />
          <div className="mt-2 flex text-sm text-gray-600">
            <label
              htmlFor={inputId}
              className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
            >
              <span>파일 선택</span>
              <input
                id={inputId}
                name={inputId}
                type="file"
                multiple={isMultiple}
                className="sr-only"
                onChange={handleFileChange}
                accept={accept}
                // Add the 'multiple' attribute to allow multi-selection
              />
            </label>
            <p className="pl-1"></p>
          </div>
          <p className="text-xs text-gray-500">{fileInfo ?? placeholder}</p>
        </div>
      </div>
    </div>
  );
};

export default FileDropZone;
