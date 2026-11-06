// Vista previa del passport
import React, { useRef } from 'react';
import { FileText } from 'lucide-react';
import { CopyButton, ResultRegion, StaleNote } from '../../ui/index.js';
import { useScrollIntoViewOnChange } from '../../../hooks/useScrollIntoViewOnChange.js';
import { buildPassportCopyText } from './copyText.js';
import { PassportDocument } from './PassportDocument.js';
import type { PassportData } from './types.js';

interface PassportPreviewProps {
  data: PassportData | null;
  loading: boolean;
  error: string | null;
  stale: boolean;
}

export const PassportPreview: React.FC<PassportPreviewProps> = ({ data, loading, error, stale }) => {
  const resultRef = useRef<HTMLElement>(null);
  useScrollIntoViewOnChange(resultRef, data);

  return (
    <ResultRegion
      ref={resultRef}
      busy={loading}
      aria-labelledby="passport-preview-title"
      className="lg:col-span-7 min-w-0 border border-line rounded-xl p-4 md:p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-line min-h-9">
          <h3 id="passport-preview-title" className="text-sm font-semibold text-ink flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Preview</span>
          </h3>
          {data && <CopyButton text={buildPassportCopyText(data)} />}
        </div>

        {stale && <StaleNote action="Generate" className="mt-3" />}

        {data ? (
          <PassportDocument data={data} />
        ) : (
          <div className="py-16 flex flex-col items-center text-center gap-3">
            <FileText className="w-6 h-6 text-ink-3" aria-hidden="true" />
            {error ? (
              <p className="text-sm text-danger max-w-xs">{error}</p>
            ) : (
              <p className="text-sm text-ink-2 max-w-xs">{loading ? 'Generating…' : 'Your passport will appear here.'}</p>
            )}
          </div>
        )}
      </div>
    </ResultRegion>
  );
};
