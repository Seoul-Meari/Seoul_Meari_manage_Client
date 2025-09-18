import { useMemo } from 'react';
import { AssetBundle, AssetStatus, AssetUsage } from '../../vr-contents/types';

export const useBundleStats = (bundles: AssetBundle[]) => {
  // ... (이전과 동일, 수정 없음) ...
  return useMemo(() => {
    const totalBundles = bundles.length;
    const historicalScenes = bundles.filter(b => b.usage === 'historical' || b.usage === 'both').length;
    const promoScenes = bundles.filter(b => b.usage === 'promo' || b.usage === 'both').length;
    const totalStorage = bundles.reduce((sum, b) => sum + b.totalSizeMB, 0);

    return [
      { title: "총 번들", value: String(totalBundles) },
      { title: "역사 씬", value: String(historicalScenes) },
      { title: "프로모션", value: String(promoScenes) },
      { title: "스토리지(MB)", value: Math.round(totalStorage).toLocaleString() }, 
    ];
  }, [bundles]);
};

export const useFilteredBundles = (
  bundles: AssetBundle[],
  query: string,
  usage: AssetUsage | "all",
  status: AssetStatus | "all",
  sortBy: 'recent' | 'size' | 'name'
) => {
  return useMemo(() => {
    let filtered = [...bundles];
    const lowerQuery = query.toLowerCase();

    // 1. Filter
    filtered = filtered.filter(bundle => {
      if (usage !== "all" && bundle.usage !== usage) return false;
      if (status !== "all" && bundle.status !== status) return false;
      if (lowerQuery) {
        // 번들 이름, ID, 그리고 내부 프리팹의 이름과 태그까지 검색
        const isInBundle = bundle.name.toLowerCase().includes(lowerQuery) ||
                           bundle.bundleId.toLowerCase().includes(lowerQuery);
        const isInPrefabs = bundle.prefabs.some(prefab => 
          prefab.name.toLowerCase().includes(lowerQuery) || 
          prefab.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
        if (!isInBundle && !isInPrefabs) return false;
      }
      return true;
    });

    // 2. Sort (수정 없음)
    // ...
    switch (sortBy) {
      case 'size':
        filtered.sort((a, b) => b.totalSizeMB - a.totalSizeMB);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }

    return filtered;
  }, [bundles, query, usage, status, sortBy]);
};