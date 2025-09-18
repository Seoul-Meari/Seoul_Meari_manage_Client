export type AssetUsage = "historical" | "promo" | "both";
export type AssetStatus = "draft" | "published" | "archived";

// --- Primitive Types for 3D Transform ---
export interface Location {
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface Scale {
  x: number;
  y: number;
  z: number;
}

// --- Core Data Structures ---
export interface Prefab {
  id: string; // UI에서 관리를 위한 내부 ID
  name: string; // Prefab 이름 (예: "TreePrefab")
  sizeMB: number; // 개별 프리팹의 용량
  tags: string[]; // 검색을 위한 태그

  // 3D Transform 정보
  location: Location;
  rotation: Rotation;
  scale: Scale;
}

// AssetBundle: 프리팹 묶음과 메타데이터. 관리의 기본 단위.
export interface AssetBundle {
  // JSON 구조 기반 필드
  bundleId: string; // (bundle_id)
  bundleUrl: string; // (bundle_url)
  prefabs: Prefab[]; // (prefabs)
  
  // UI 관리를 위한 추가 메타데이터
  name: string; // 번들의 표시 이름 (예: "시민 공원 나무 및 가로등")
  version: string;
  status: AssetStatus;
  usage: AssetUsage;
  updatedAt: string;
  totalSizeMB: number;
  tags: string[];         // 번들 자체에 대한 검색 태그
  description?: string;   // 번들에 대한 설명 (선택 사항)
}

export interface BundleUploadPayload {
  bundleFile: File;
  layoutFile: File;
  name: string;
  version: string;
  usage: AssetUsage;
  tags: string[];
  description: string;
}