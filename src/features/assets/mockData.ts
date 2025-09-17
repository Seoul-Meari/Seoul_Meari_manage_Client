import { AssetBundle } from '../urban-issue/types';

export const MOCK_BUNDLES: AssetBundle[] = [
  {
    bundleId: "gyeongbokgung_main_hall",
    bundleUrl: "https://cdn.example.com/bundles/historical/seoul/gyeongbokgung_main_hall_v1.0.1.bundle",
    name: "경복궁_근정전",
    version: "1.0.1",
    status: "published",
    usage: "historical",
    updatedAt: "2025-09-11T10:30:00Z",
    totalSizeMB: 186.2,
    tags: ["palace", "seoul", "historical-site"],
    description: "경복궁의 주요 건물인 근정전과 계단 애셋을 포함합니다.",
    prefabs: [
      { 
        id: "p-001", name: "Geunjeongjeon_Main_LOD2", sizeMB: 120.5, tags: ["main-hall", "lod2"],
        location: { latitude: 37.5796, longitude: 126.9770, altitude: 20.0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      { 
        id: "p-002", name: "Geunjeongjeon_Stairs_LOD1", sizeMB: 45.7, tags: ["stairs", "stone"],
        location: { latitude: 37.5796, longitude: 126.9770, altitude: 15.0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
    ]
  },
  {
    bundleId: "gangnam_promo_2025",
    bundleUrl: "https://cdn.example.com/bundles/promo/gangnam_promo_2025_v2.0.0.bundle",
    name: "브랜드_포토월_2025",
    version: "2.0.0",
    status: "draft",
    usage: "promo",
    updatedAt: "2025-09-14T08:00:00Z",
    totalSizeMB: 44.1,
    tags: ["brand", "event", "photowall"],
    description: "2025년 강남역 브랜드 프로모션용 포토월 및 로고 애셋.",
    prefabs: [
      { 
        id: "p-006", name: "Photowall_Frame", sizeMB: 30.1, tags: ["frame", "event"],
        location: { latitude: 37.4979, longitude: 127.0276, altitude: 10.0 },
        rotation: { x: 0, y: 45, z: 0 },
        scale: { x: 1.5, y: 1.5, z: 1.5 }
      },
      { 
        id: "p-007", name: "Logo_3D_Spinning", sizeMB: 14.0, tags: ["logo", "animation"],
        location: { latitude: 37.4979, longitude: 127.0276, altitude: 13.0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 0.8, y: 0.8, z: 0.8 }
      },
    ]
  },
];