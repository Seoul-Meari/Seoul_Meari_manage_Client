import React, { useState } from 'react';
import AiStatCard from '@/features/ai-diagnosis/components/AiStatCard';
import { AssetBundle, AssetStatus, AssetUsage } from '@/features/urban-issue/types';
import { MOCK_BUNDLES } from '@/features/assets/mockData';
import { HistoricIcon, MegaphoneIcon, PackageIcon, SearchIcon, StorageIcon, UploadIcon } from '@/components/common/Icon';
import { Select } from '@/components/common/Select';
import { useFilteredBundles, useBundleStats } from '@/features/urban-issue/hooks/useBundleHooks'; // 새로운 훅 import
import BundleTable from '@/features/vr-contents/components/AssetTable';
import UploadBundleModal from '@/features/vr-contents/components/UploadBundleModal';

const VRContentsPage: React.FC = () => {
  // --- States ---
  const [q, setQ] = useState("");
  const [usage, setUsage] = useState<AssetUsage | "all">("all");
  const [status, setStatus] = useState<AssetStatus | "all">("all");
  const [sortBy, setSortBy] = useState<'recent' | 'size' | 'name'>("recent");
  const [bundles] = useState<AssetBundle[]>(MOCK_BUNDLES); // rows -> bundles, MOCK_ASSETS -> MOCK_BUNDLES
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Memos (Computed Data) ---
  const filteredBundles = useFilteredBundles(bundles, q, usage, status, sortBy); // hook 변경
  const bundleStats = useBundleStats(bundles); // hook 변경

  const statsWithIcons = bundleStats.map(stat => {
      const iconMap = {
          "총 번들": { icon: <PackageIcon />, iconBgColor: "bg-blue-100 text-blue-600" }, // "총 에셋" -> "총 번들"
          "역사 씬": { icon: <HistoricIcon />, iconBgColor: "bg-purple-100 text-purple-600" },
          "프로모션": { icon: <MegaphoneIcon />, iconBgColor: "bg-yellow-100 text-yellow-600" },
          "스토리지(MB)": { icon: <StorageIcon />, iconBgColor: "bg-indigo-100 text-indigo-600" },
      };
      return { ...stat, ...iconMap[stat.title as keyof typeof iconMap] };
  });

  // --- Handlers ---
  const handleUploadBundle = () => setIsModalOpen(true);
  // const handleUploadSubmit = (payload /*: BundleUploadPayload*/) => {
  //   console.log("업로드할 데이터:", payload);
  //   alert(`${payload.name} 번들 업로드를 시작합니다.`);
  //   // TODO: API 호출 후, setBundles(...)를 통해 목록을 새로고침합니다.
  // };
  const handlePreviewBundle = (bundle: AssetBundle) => alert(`미리보기: ${bundle.name}`);
  const handleEditBundle = (bundle: AssetBundle) => alert(`메타 편집: ${bundle.name}`);
  const handleDeleteBundle = (bundle: AssetBundle) => alert(`삭제: ${bundle.name}`);

  // --- Render ---
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">VR 콘텐츠 관리</h1>
        <p className="text-md text-gray-500 mt-1">역사 재현 및 기업 프로모션용 3D 에셋 번들을 관리합니다.</p>
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
          <div className="relative"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="번들 이름, 키, 내부 에셋 태그…" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-gray-900" /><div className="pointer-events-none absolute inset-y-0 left-3 flex items-center"><SearchIcon /></div></div>
        </div>
        <div className="sm:col-span-2"><div className="flex sm:justify-end"><button onClick={handleUploadBundle} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 py-2 ring-1 ring-gray-300 hover:bg-gray-50"><UploadIcon /><span className="whitespace-nowrap">번들 업로드</span></button></div></div>
      </div>

      {/* Table */}
      <BundleTable
        bundles={filteredBundles}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onPreview={handlePreviewBundle}
        onEdit={handleEditBundle}
        onDelete={handleDeleteBundle}
      />
      
      {/* 모달은 이 div 안에 있어도 position: fixed 속성 때문에 화면 전체에 올바르게 표시됩니다. */}
      <UploadBundleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default VRContentsPage;