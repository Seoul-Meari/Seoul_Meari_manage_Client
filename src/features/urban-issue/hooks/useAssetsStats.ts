import { useMemo } from 'react';
import { AssetRow } from '../types';

/**
 * asset 목록을 받아 통계 데이터를 계산하는 커스텀 훅
 */
export const useAssetStats = (assets: AssetRow[]) => {
  const stats = useMemo(() => {
    if (!assets || assets.length === 0) {
      return [
        { title: "총 에셋", value: "0" },
        { title: "역사 씬", value: "0" },
        { title: "프로모션", value: "0" },
        { title: "스토리지(MB)", value: "0.0" },
      ];
    }

    const total = assets.length;
    const historical = assets.filter((r) => r.usage === "historical" || r.usage === "both").length;
    const promo = assets.filter((r) => r.usage === "promo" || r.usage === "both").length;
    const storage = assets.reduce((acc, r) => acc + r.sizeMB, 0);

    return [
      { title: "총 에셋", value: String(total) },
      { title: "역사 씬", value: String(historical) },
      { title: "프로모션", value: String(promo) },
      { title: "스토리지(MB)", value: storage.toFixed(1) },
    ];
  }, [assets]);

  return stats;
};