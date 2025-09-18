export const buildExampleLayout = () => ({
  prefabs: [
    {
      id: "p-001",
      name: "Geunjeongjeon_Main_LOD2",
      sizeMB: 120.5,
      tags: ["main-hall", "lod2"],
    },
    {
      id: "p-002",
      name: "Geunjeongjeon_Stairs_LOD1",
      sizeMB: 45.7,
      tags: ["stairs", "stone"],
    },
  ],
  placementGroups: [
    {
      groupId: "pg-1",
      prefabId: "p-001",
      transforms: [
        {
          location: { latitude: 37.5796, longitude: 126.977, altitude: 20.0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      ],
    },
    {
      groupId: "pg-2",
      prefabId: "p-002",
      transforms: [
        {
          location: { latitude: 37.5796, longitude: 126.977, altitude: 15.0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      ],
    },
  ],
});