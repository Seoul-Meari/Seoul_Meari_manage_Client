/**
 * JSON 파일 예시
{
  "bundle_id": "park_tree_lamp_v1",
  "bundle_url": "https://cdn.example.com/bundles/park_tree_lamp_v1.ab",
  "prefabs": [
    {
      "id": "pfb-001",
      "name": "TreePrefab_Oak",
      "size_mb": 12.4,
      "tags": ["tree", "nature", "oak"],
      "location": { "latitude": 37.5665, "longitude": 126.978, "altitude": 38.2 },
      "rotation": { "x": 0, "y": 45, "z": 0 },
      "scale": { "x": 1.0, "y": 1.0, "z": 1.0 }
    },
    {
      "id": "pfb-002",
      "name": "StreetLamp_Modern_A",
      "size_mb": 8.7,
      "tags": ["lamp", "street", "light"],
      "location": { "latitude": 37.56655, "longitude": 126.97812, "altitude": 38.1 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "scale": { "x": 1.2, "y": 1.2, "z": 1.2 }
    }
  ],
  "name": "시민 공원: 나무 + 가로등",
  "version": "1.0.0",
  "status": "draft",
  "usage": "both",
  "updated_at": "2025-09-18T02:30:00Z",
  "total_size_mb": 21.1,
  "tags": ["park", "daytime", "seoul"],
  "description": "서울 시민 공원 구역의 기본 조경(참나무)과 가로등 배치"
}
 */

export type AssetUsage = "historical" | "promo" | "both";
export type AssetStatus = "draft" | "published" | "archived";
export type AssetOS = "android" | "ios";
export interface Transform3D { location: Location; rotation: Rotation; scale: Scale; }

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


// 프리팹 정의
export interface PrefabDefinition {
  id: string;
  name: string;
  sizeMB: number;
  tags: string[];
}

// 프리팹 배치 그룹 (여러 transform을 한 번에)
export interface PrefabPlacementGroup {
  groupId: string;
  prefabId: string;
  transforms: Transform3D[];
  active?: boolean;
}

export interface AssetBundle {
  bundleId: string;
  bundleUrl: string;

  prefabs: PrefabDefinition[];
  placementGroups: PrefabPlacementGroup[];

  name: string;
  version: string;
  status: AssetStatus;
  usage: AssetUsage;
  os: AssetOS;
  updatedAt: string;
  totalSizeMB: number;
  tags: string[];
  description?: string;
}

export interface BundleUploadPayload {
  bundleFile: File[];         // .assetbundle, .unity3d 등
  layoutFile: File[];         // JSON (placementGroups만 포함)
  name: string;
  version: string;
  usage: AssetUsage;
  os: AssetOS;
  tags: string[];
  description: string;
}