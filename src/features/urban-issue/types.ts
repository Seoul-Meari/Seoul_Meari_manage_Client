// src/features/urban-issue/types.ts

// GPS 좌표를 위한 타입을 추가합니다.
export interface GpsLocation {
  lat: number;
  lon: number;
}

export interface AssetRow {
  id: string;
  name: string;
  bundleKey: string;
  version: string;
  category: string;
  sizeMB: number;
  updatedAt: string;
  status: AssetStatus;
  usage: AssetUsage;
  tags: string[];
  // locations 타입을 GpsLocation 배열로 변경합니다.
  location: GpsLocation; 
}

// ... 기타 타입들
export type AssetStatus = "draft" | "published" | "archived";
export type AssetUsage = "historical" | "promo" | "both";