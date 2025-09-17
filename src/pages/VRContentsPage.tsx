// src/features/assets/pages/VRContentsPage.tsx
import React, { useState } from 'react';

// 타입, 데이터, 하위 컴포넌트 import

// 가정: 다른 피처나 공용 컴포넌트들이 이 경로에 있다고 가정합니다.
import AiStatCard from '@/features/ai-diagnosis/components/AiStatCard';
import { AssetRow, AssetStatus, AssetUsage } from '@/features/urban-issue/types';
import { MOCK_ASSETS } from '@/features/assets/mockData';
import { HistoricIcon, MegaphoneIcon, PackageIcon, SearchIcon, StorageIcon, UploadIcon } from '@/components/common/Icon';
import { Select } from '@/components/common/Select';
import AssetTable from '@/features/vr-contents/components/AssetTable';
import { useFilteredAssets } from '@/features/urban-issue/hooks/useFilteredAssets';
import { useAssetStats } from '@/features/urban-issue/hooks/useAssetsStats';

const VRContentsPage: React.FC = () => {
  // --- States ---
  const [q, setQ] = useState("");
  const [usage, setUsage] = useState<AssetUsage | "all">("all");
  const [status, setStatus] = useState<AssetStatus | "all">("all");
  const [sortBy, setSortBy] = useState<'recent' | 'size' | 'name'>("recent");
  const [rows] = useState<AssetRow[]>(MOCK_ASSETS); // 실제로는 API 호출 결과가 될 것

  // --- Memos (Computed Data) ---
  const filteredAssets = useFilteredAssets(rows, q, usage, status, sortBy);
  const assetStats = useAssetStats(rows);

  const statsWithIcons = assetStats.map(stat => {
      const iconMap = {
          "총 에셋": { icon: <PackageIcon />, iconBgColor: "bg-blue-100 text-blue-600" },
          "역사 씬": { icon: <HistoricIcon />, iconBgColor: "bg-purple-100 text-purple-600" },
          "프로모션": { icon: <MegaphoneIcon />, iconBgColor: "bg-yellow-100 text-yellow-600" },
          "스토리지(MB)": { icon: <StorageIcon />, iconBgColor: "bg-indigo-100 text-indigo-600" },
      };
      return { ...stat, ...iconMap[stat.title as keyof typeof iconMap] };
  });

  // --- Handlers ---
  const handleUploadBundle = () => alert("번들 업로드 다이얼로그 열기");
  const handlePreviewAsset = (asset: AssetRow) => alert(`미리보기: ${asset.name}`);
  const handleEditAsset = (asset: AssetRow) => alert(`메타 편집: ${asset.name}`);
  const handleDeleteAsset = (asset: AssetRow) => alert(`삭제: ${asset.name}`);

  // --- Render ---
  return (
    <div className="space-y-6 p-6"> {/* 페이지 패딩 추가 */}
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">VR 콘텐츠 관리</h1>
        <p className="text-md text-gray-500 mt-1">역사 재현 및 기업 프로모션용 3D 에셋 관리</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsWithIcons.map((item) => <AiStatCard key={item.title} {...item} change={null} />)}
      </div>

      {/* Filters & Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-end">
        <div className="sm:col-span-3"><Select label="용도" value={usage} onChange={(v) => setUsage(v as any)} options={[{ value: "all", label: "전체" }, { value: "historical", label: "역사" }, { value: "promo", label: "프로모션" }, { value: "both", label: "둘 다" }]} /></div>
        <div className="sm:col-span-3"><Select label="상태" value={status} onChange={(v) => setStatus(v as any)} options={[{ value: "all", label: "전체" }, { value: "draft", label: "드래프트" }, { value: "published", label: "배포됨" }, { value: "archived", label: "보관됨" }]} /></div>
        <div className="sm:col-span-4">
          <label className="block text-sm text-gray-600 mb-1">검색</label>
          <div className="relative"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="이름, 번들 키, 태그…" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-gray-900" /><div className="pointer-events-none absolute inset-y-0 left-3 flex items-center"><SearchIcon /></div></div>
        </div>
        <div className="sm:col-span-2"><div className="flex sm:justify-end"><button onClick={handleUploadBundle} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 py-2 ring-1 ring-gray-300 hover:bg-gray-50"><UploadIcon /><span className="whitespace-nowrap">번들 업로드</span></button></div></div>
      </div>

      {/* Table */}
      <AssetTable
        assets={filteredAssets}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onPreview={handlePreviewAsset}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />
    </div>
  );
};

export default VRContentsPage;