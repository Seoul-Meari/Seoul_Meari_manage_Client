// src/components/vr/LayoutJsonExample.tsx
import React, { useMemo, useState } from 'react';

type ExampleCase = 'camel' | 'snake';

export interface LayoutJsonExampleProps {
  title?: string;
  description?: string;
  // 예시 JSON 객체를 반환하는 빌더(부모 컴포넌트에서 placement_groups 중심으로 제공)
  dataBuilder: () => unknown;
  initialCase?: ExampleCase;
  className?: string;
}

// --------- 유틸: 키 변환 (deep) ----------
const toSnake = (s: string) =>
  s.replace(/([A-Z])/g, '_$1').replace(/__/g, '_').toLowerCase();

const toCamel = (s: string) =>
  s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

function transformKeysDeep(obj: any, target: 'snake' | 'camel'): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => transformKeysDeep(v, target));
  }
  if (obj && typeof obj === 'object') {
    const out: Record<string, any> = {};
    Object.keys(obj).forEach((k) => {
      const newKey = target === 'snake' ? toSnake(k) : toCamel(k);
      out[newKey] = transformKeysDeep(obj[k], target);
    });
    return out;
  }
  return obj;
}

// --------- 컴포넌트 ----------
const LayoutJsonExample: React.FC<LayoutJsonExampleProps> = ({
  title = '레이아웃 JSON 예시',
  description = '',
  dataBuilder,
  initialCase = 'snake',
  className = '',
}) => {
  const [exampleCase, setExampleCase] = useState<ExampleCase>(initialCase);

  const exampleJson = useMemo(() => {
    const raw = dataBuilder();
    const transformed = transformKeysDeep(raw, exampleCase);
    return JSON.stringify(transformed, null, 2);
  }, [dataBuilder, exampleCase]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exampleJson);
      alert('예시 JSON이 클립보드에 복사되었습니다.');
    } catch {
      alert('복사에 실패했어요. 브라우저 권한을 확인하세요.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exampleJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const filename = `layout_example_groups_${exampleCase}.json`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className={`rounded-xl border border-gray-200 bg-gray-50 p-4 ${className}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* case switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">표기 방식:</span>
            <div className="inline-flex">
              <button
                type="button"
                onClick={() => setExampleCase('snake')}
                className={`px-3 py-1 text-xs ${
                  exampleCase === 'snake'
                    ? 'font-semibold text-gray-900'
                    : 'text-gray-600 hover:font-semibold'
                }`}
              >
                snake_case
              </button>
              <button
                type="button"
                onClick={() => setExampleCase('camel')}
                className={`px-3 py-1 text-xs ${
                  exampleCase === 'camel'
                    ? 'font-semibold text-gray-900'
                    : 'text-gray-600 hover:font-semibold'
                }`}
              >
                camelCase
              </button>
            </div>
          </div>
          {/* actions */}
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
          >
            복사
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-700"
          >
            JSON 다운로드
          </button>
        </div>
      </div>

      <pre className="max-h-72 overflow-auto rounded-lg bg-black p-3 text-xs leading-5 text-gray-100">
{exampleJson}
      </pre>
    </section>
  );
};

export default LayoutJsonExample;