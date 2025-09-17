import { useMemo } from 'react';
import { AssetRow, AssetStatus, AssetUsage } from '../types';

/**
 * asset 목록을 받아 각종 필터링 및 정렬 로직을 적용하는 커스텀 훅
 */
export const useFilteredAssets = (
  assets: AssetRow[],
  query: string,
  usage: AssetUsage | 'all',
  status: AssetStatus | 'all',
  sortBy: 'recent' | 'size' | 'name'
) => {
  const filteredAssets = useMemo(() => {
    // 1. 검색어(query) 필터링
    let result = assets.filter((asset) =>
      [asset.name, asset.bundleKey, asset.version, asset.category, asset.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    // 2. 용도(usage) 필터링
    if (usage !== "all") {
      result = result.filter((asset) => asset.usage === usage || asset.usage === 'both');
    }

    // 3. 상태(status) 필터링
    if (status !== "all") {
      result = result.filter((asset) => asset.status === status);
    }

    // 4. 정렬(sortBy)
    switch (sortBy) {
      case "size":
        result.sort((a, b) => b.sizeMB - a.sizeMB);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
        break;
      default: // 'recent'
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }
    return result;
  }, [assets, query, usage, status, sortBy]);

  return filteredAssets;
};