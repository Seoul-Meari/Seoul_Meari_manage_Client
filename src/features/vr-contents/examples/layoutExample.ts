import { LayoutJson } from '../types';

export const buildExampleLayout = (): LayoutJson => ({
  bundleId: "test_bundle",
  name: "Jeju_Heritage_Assets",
  os: "android",
  version: "1.0.0",
  usage: "both",
  updatedAt: "2025-09-18T12:30:00Z",
  totalSizeMB: 107.2,
  tags: ["generated", "heritage", "sample"],
  description: "제주 문화유산 관련 에셋 번들 예시 데이터",
  mainLocation: { latitude: 35.1869, longitude: 129.074000, altitude: -2 },
  prefabs: [
    {
      id: "prefab-001",
      name: "Gwandeokjong",
      sizeMB: 54.3,
      tags: ["historical", "temple", "jeju"]
    },
    {
      id: "prefab-002",
      name: "Plane",
      sizeMB: 52.9,
      tags: ["demo", "geometry", "sample"]
    }
  ],
  placementGroups: [
    {
      groupId: "group-001",
      prefabId: "prefab-001",
      transforms: [
        {
          location: { latitude: 35.1869, longitude: 129.074000, altitude: -2 },
          rotation: { x: 0, y: 45, z: 0 },
          scale: { x: 1, y: 1, z: 1 }
        }
      ],
      active: true
    },
    {
      groupId: "group-002",
      prefabId: "prefab-002",
      transforms: [
        {
          location: { latitude: 35.1869, longitude: 129.074000, altitude: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 2, y: 1, z: 2 }
        }
      ],
      active: false
    }
  ]
});