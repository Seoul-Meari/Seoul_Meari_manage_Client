// src/features/assets/components/AssetTable.tsx
import React from 'react';
// 이 프로젝트의 타입 import
import { IconButton } from '@/components/common/IconButton';
import { Select } from '@/components/common/Select';
import { AssetRow, AssetStatus, AssetUsage } from '@/features/urban-issue/types';
import { CubeIcon, EyeIcon, PencilIcon, TrashIcon } from '@/components/common/Icon';

// --- Table-specific UI Components ---
// 이 컴포넌트들이 AssetTable에서만 사용되므로, 여기에 함께 두어 관리 편의성을 높입니다.

const Th: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <th className={`px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 ${className ?? ""}`}>
    {children}
  </th>
);

const Td: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <td className={`px-4 py-3 text-sm text-gray-800 ${className ?? ""}`}>
    {children}
  </td>
);

const UsageBadge: React.FC<{ usage: AssetUsage }> = ({ usage }) => {
  const map: Record<AssetUsage, { label: string; cls: string }> = {
    historical: { label: "역사", cls: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    promo: { label: "프로모션", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    both: { label: "둘 다", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${map[usage].cls}`}>{map[usage].label}</span>;
};

const StatusBadge: React.FC<{ status: AssetStatus }> = ({ status }) => {
  const map: Record<AssetStatus, { label: string; cls: string }> = {
    draft: { label: "드래프트", cls: "bg-gray-100 text-gray-700 border-gray-200" },
    published: { label: "배포됨", cls: "bg-blue-50 text-blue-700 border-blue-200" },
    archived: { label: "보관됨", cls: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${map[status].cls}`}>{map[status].label}</span>;
};


// --- Main Component ---
interface AssetTableProps {
  assets: AssetRow[];
  sortBy: 'recent' | 'size' | 'name';
  onSortChange: (value: 'recent' | 'size' | 'name') => void;
  onPreview: (asset: AssetRow) => void;
  onEdit: (asset: AssetRow) => void;
  onDelete: (asset: AssetRow) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  sortBy,
  onSortChange,
  onPreview,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="text-sm text-gray-600">총 {assets.length}개</div>
        <Select
          value={sortBy}
          onChange={(v) => onSortChange(v as 'recent' | 'size' | 'name')}
          options={[
            { value: "recent", label: "최근 수정" },
            { value: "size", label: "용량" },
            { value: "name", label: "이름" },
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>이름</Th>
              <Th>버전</Th>
              <Th>번들 키</Th>
              <Th className="text-right">크기(MB)</Th>
              <Th>용도</Th>
              <Th>상태</Th>
              <Th>참조 위치</Th>
              <Th>수정</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <Td>
                  <div className="flex items-center gap-2">
                    <CubeIcon />
                    <div>
                      <div className="font-medium text-gray-900">{asset.name}</div>
                      <div className="text-xs text-gray-500">{asset.tags.join(" · ")}</div>
                    </div>
                  </div>
                </Td>
                <Td>{asset.version}</Td>
                <Td>
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">{asset.bundleKey}</code>
                </Td>
                <Td className="text-right tabular-nums">{asset.sizeMB.toFixed(1)}</Td>
                <Td><UsageBadge usage={asset.usage} /></Td>
                <Td><StatusBadge status={asset.status} /></Td>
                <Td className="tabular-nums">{asset.locations}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <IconButton title="미리보기" onClick={() => onPreview(asset)}><EyeIcon /></IconButton>
                    <IconButton title="메타편집" onClick={() => onEdit(asset)}><PencilIcon /></IconButton>
                    <IconButton title="삭제" danger onClick={() => onDelete(asset)}><TrashIcon /></IconButton>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;