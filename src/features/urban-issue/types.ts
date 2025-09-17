// urban-issue 기능에서 사용하는 TypeScript 타입 정의
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
