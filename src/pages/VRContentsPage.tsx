import React, { useMemo, useState } from "react";

// ---------------------------------------------
// Asset Management Page (React + TailwindCSS)
// - Inspired by your UserManagementPage structure
// - Includes: stats, filters, list/table, quick actions, modals
// - Focused on assets used for historical scenes (e.g., old Gyeongbokgung)
//   and brand promotions.
// ---------------------------------------------

// Types
export type AssetUsage = "historical" | "promo" | "both";
export type AssetStatus = "draft" | "published" | "archived";

export interface AssetRow {
  id: string;
  name: string;
  bundleKey: string; // Addressables/Bundle key
  version: string;
  category: string; // e.g., building, wall, pond, prop
  sizeMB: number;
  updatedAt: string; // ISO
  status: AssetStatus;
  usage: AssetUsage;
  tags: string[];
  locations: number; // how many placements map to this asset
}

// Mock data (replace with API)
const MOCK_ASSETS: AssetRow[] = [
  {
    id: "a-001",
    name: "경복궁_근정전",
    bundleKey: "gyeongbokgung/geunjeongjeon@1",
    version: "1.0.1",
    category: "building",
    sizeMB: 186.2,
    updatedAt: "2025-09-11T10:30:00Z",
    status: "published",
    usage: "historical",
    tags: ["palace", "main-hall", "lod2"],
    locations: 7,
  },
  {
    id: "a-002",
    name: "경복궁_연못",
    bundleKey: "gyeongbokgung/pond@3",
    version: "1.3.0",
    category: "pond",
    sizeMB: 92.5,
    updatedAt: "2025-09-12T04:12:00Z",
    status: "published",
    usage: "both",
    tags: ["water", "reflection", "lod1"],
    locations: 5,
  },
  {
    id: "a-003",
    name: "브랜드_포토월_2025",
    bundleKey: "promo/photowall@2025",
    version: "2.0.0",
    category: "prop",
    sizeMB: 44.1,
    updatedAt: "2025-09-14T08:00:00Z",
    status: "draft",
    usage: "promo",
    tags: ["brand", "event"],
    locations: 0,
  },
  {
    id: "a-004",
    name: "경복궁_담장",
    bundleKey: "gyeongbokgung/wall@4",
    version: "1.1.4",
    category: "wall",
    sizeMB: 128.6,
    updatedAt: "2025-09-08T09:00:00Z",
    status: "published",
    usage: "historical",
    tags: ["wall", "tile", "lod2"],
    locations: 12,
  },
  {
    id: "a-005",
    name: "브랜드_부스_프레임",
    bundleKey: "promo/booth_frame@7",
    version: "0.9.2",
    category: "prop",
    sizeMB: 63.3,
    updatedAt: "2025-09-10T12:00:00Z",
    status: "archived",
    usage: "promo",
    tags: ["kiosk", "demo"],
    locations: 0,
  },
];

// Page
const VRContentsPage: React.FC = () => {
  const [q, setQ] = useState("");
  const [usage, setUsage] = useState<AssetUsage | "all">("all");
  const [status, setStatus] = useState<AssetStatus | "all">("all");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "size" | "name">("recent");
  const [rows, setRows] = useState<AssetRow[]>(MOCK_ASSETS);

  const filtered = useMemo(() => {
    let res = rows.filter((r) =>
      [r.name, r.bundleKey, r.version, r.category, r.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase())
    );
    if (usage !== "all") res = res.filter((r) => r.usage === usage);
    if (status !== "all") res = res.filter((r) => r.status === status);
    if (tag.trim()) res = res.filter((r) => r.tags.includes(tag.trim()));

    switch (sortBy) {
      case "size":
        res.sort((a, b) => b.sizeMB - a.sizeMB);
        break;
      case "name":
        res.sort((a, b) => a.name.localeCompare(b.name, "ko"));
        break;
      default:
        res.sort((a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }
    return res;
  }, [q, usage, status, tag, sortBy, rows]);

  // Stats
  const total = rows.length;
  const historical = rows.filter((r) => r.usage === "historical" || r.usage === "both").length;
  const promo = rows.filter((r) => r.usage === "promo" || r.usage === "both").length;
  const drafts = rows.filter((r) => r.status === "draft").length;
  const storage = rows.reduce((acc, r) => acc + r.sizeMB, 0);

  // Actions (mock handlers)
  const handleUploadBundle = () => alert("번들 업로드(예: S3 Presigned URL) 다이얼로그 열기");
  const handleCreateAsset = () => alert("새 에셋 메타 생성(Form)");
  const handleBulkPublish = () => alert("선택 항목 배포/Publish");
  const handleBulkArchive = () => alert("선택 항목 보관/Archive");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">에셋 관리</h1>
        <p className="text-md text-gray-500 mt-1">역사(경복궁 등) 재현 및 기업 프로모션용 3D 에셋을 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="총 에셋" value={String(total)} change={""} icon={<PackageIcon />} />
        <StatCard title="역사 씬 사용 가능" value={String(historical)} change={""} icon={<HistoricIcon />} />
        <StatCard title="프로모션 가능" value={String(promo)} change={""} icon={<MegaphoneIcon />} />
        <StatCard title="드래프트" value={String(drafts)} change={""} icon={<DraftIcon />} />
        <StatCard title="스토리지(MB)" value={storage.toFixed(1)} change={""} icon={<StorageIcon />} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={handleCreateAsset} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-2 hover:bg-black/90">
            <PlusIcon /> 새 에셋 메타
          </button>
          <button onClick={handleUploadBundle} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 ring-1 ring-gray-300 hover:bg-gray-50">
            <UploadIcon /> 번들 업로드
          </button>
          <button onClick={handleBulkPublish} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700">
            <RocketIcon /> 선택 Publish
          </button>
          <button onClick={handleBulkArchive} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-white px-4 py-2 hover:bg-amber-600">
            <ArchiveIcon /> 선택 보관
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색: 이름, 번들 키, 태그..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-gray-900"
          />
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center"><SearchIcon /></div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Select label="용도" value={usage} onChange={(v) => setUsage(v as any)} options={[
          { value: "all", label: "전체" },
          { value: "historical", label: "역사" },
          { value: "promo", label: "프로모션" },
          { value: "both", label: "둘 다" },
        ]} />
        <Select label="상태" value={status} onChange={(v) => setStatus(v as any)} options={[
          { value: "all", label: "전체" },
          { value: "draft", label: "드래프트" },
          { value: "published", label: "배포됨" },
          { value: "archived", label: "보관됨" },
        ]} />
        <div>
          <label className="block text-sm text-gray-600 mb-1">태그</label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="예: lod2 / water / brand"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="text-sm text-gray-600">총 {filtered.length}개</div>
          <Select compact label="정렬" hideLabel value={sortBy} onChange={(v) => setSortBy(v as any)} options={[
            { value: "recent", label: "최근 수정" },
            { value: "size", label: "용량" },
            { value: "name", label: "이름" },
          ]} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <Th>이름</Th>
                <Th>버전</Th>
                <Th>번들 키</Th>
                <Th>카테고리</Th>
                <Th className="text-right">크기(MB)</Th>
                <Th>용도</Th>
                <Th>상태</Th>
                <Th>참조 위치</Th>
                <Th>수정</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <Td>
                    <div className="flex items-center gap-2">
                      <CubeIcon />
                      <div>
                        <div className="font-medium text-gray-900">{r.name}</div>
                        <div className="text-xs text-gray-500">{r.tags.join(" · ")}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>{r.version}</Td>
                  <Td>
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">{r.bundleKey}</code>
                  </Td>
                  <Td>{r.category}</Td>
                  <Td className="text-right tabular-nums">{r.sizeMB.toFixed(1)}</Td>
                  <Td><UsageBadge usage={r.usage} /></Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td className="tabular-nums">{r.locations}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <IconButton title="미리보기" onClick={() => alert(`미리보기: ${r.name}`)}><EyeIcon /></IconButton>
                      <IconButton title="메타편집" onClick={() => alert(`메타 편집: ${r.name}`)}><PencilIcon /></IconButton>
                      {r.status !== "archived" ? (
                        <IconButton title="보관" onClick={() => alert(`보관: ${r.name}`)}><ArchiveIcon /></IconButton>
                      ) : (
                        <IconButton title="복원" onClick={() => alert(`복원: ${r.name}`)}><RestoreIcon /></IconButton>
                      )}
                      <IconButton title="삭제" danger onClick={() => alert(`삭제: ${r.name}`)}><TrashIcon /></IconButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reference panel (tips) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h3 className="text-lg font-semibold">운영 팁</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>대용량은 Addressables 원격 번들 권장. 번들 키와 버전을 명확히 관리하세요.</li>
          <li>역사/프로모션 용도에 따라 태그를 구분하고, 검색/필터로 빠르게 찾을 수 있게 하세요.</li>
          <li>정적 리소스는 LOD/부분 분할하여 필요한 구역만 스트리밍 로드하세요.</li>
          <li>스토리지/트래픽을 줄이려면 캐시 헤더(immutable)와 카탈로그 버전 전략을 활용하세요.</li>
        </ul>
      </div>
    </div>
  );
};

// ------------------ Reusable UI ------------------
const Th: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <th className={`px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 ${className ?? ""}`}>{children}</th>
);
const Td: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <td className={`px-4 py-3 text-sm text-gray-800 ${className ?? ""}`}>{children}</td>
);

const StatCard: React.FC<{ title: string; value: string; change?: string; icon?: React.ReactNode }> = ({ title, value, change, icon }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="mt-1 text-2xl font-bold text-gray-900">{value}</div>
      </div>
      <div className="text-gray-500">{icon}</div>
    </div>
    {change ? <div className="mt-2 text-xs text-gray-500">전주 대비 {change}</div> : null}
  </div>
);

const Select: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  compact?: boolean;
  hideLabel?: boolean;
}> = ({ label, value, onChange, options, compact, hideLabel }) => (
  <div>
    {!hideLabel && <label className="block text-sm text-gray-600 mb-1">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-xl border border-gray-300 bg-white ${compact ? "px-2 py-1" : "px-4 py-2"} outline-none focus:ring-2 focus:ring-gray-900`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const IconButton: React.FC<React.PropsWithChildren<{ title?: string; onClick?: () => void; danger?: boolean }>> = ({ children, title, onClick, danger }) => (
  <button
    title={title}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-xl border px-2.5 py-1.5 text-sm ${danger ? "border-red-200 text-red-600 hover:bg-red-50" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
  >
    {children}
  </button>
);

const UsageBadge: React.FC<{ usage: AssetUsage }> = ({ usage }) => {
  const m: Record<AssetUsage, { label: string; cls: string }> = {
    historical: { label: "역사", cls: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    promo: { label: "프로모션", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    both: { label: "둘 다", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${m[usage].cls}`}>{m[usage].label}</span>;
};

const StatusBadge: React.FC<{ status: AssetStatus }> = ({ status }) => {
  const m: Record<AssetStatus, { label: string; cls: string }> = {
    draft: { label: "드래프트", cls: "bg-gray-100 text-gray-700 border-gray-200" },
    published: { label: "배포됨", cls: "bg-blue-50 text-blue-700 border-blue-200" },
    archived: { label: "보관됨", cls: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${m[status].cls}`}>{m[status].label}</span>;
};

// ------------------ Icons (inline SVG) ------------------
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M21 16.5v-9a1.5 1.5 0 0 0-.879-1.356l-7.5-3.375a1.5 1.5 0 0 0-1.242 0l-7.5 3.375A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 3.879 17.856l7.5 3.375a1.5 1.5 0 0 0 1.242 0l7.5-3.375A1.5 1.5 0 0 0 21 16.5Z" />
  </svg>
);
const HistoricIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11h18M5 8l7-4 7 4M7 11v7m10-7v7M4 18h16" />
  </svg>
);
const MegaphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8l6-2v8l-6-2m0-4v8a3 3 0 01-6 0V9m6-1H9" />
  </svg>
);
const DraftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h12M4 9h12M4 13h8M16 5l4 4-8 8H8v-4l8-8z" />
  </svg>
);
const StorageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
    <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
  </svg>
);
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4m0 0l5-5m-5 5V7a8 8 0 018-8" />
  </svg>
);
const ArchiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7M4 7l2-3h12l2 3" />
  </svg>
);
const RestoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M20 14a8 8 0 10-8 8" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
  </svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l8.5-8.5a2.5 2.5 0 10-3.536-3.536L7 16.5" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7z" />
  </svg>
);
const CubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-gray-500">
    <path d="M12 2l9 5-9 5-9-5 9-5z" />
    <path d="M3 7l9 5 9-5" />
    <path d="M12 12v10" />
  </svg>
);

export default VRContentsPage;
