// Cuerpo del passport generado
import React from 'react';
import { SampleNotice, isSample } from '../../SampleNotice.js';
import { AccommodationList } from './AccommodationList.js';
import { ManagerQuickReference } from './ManagerQuickReference.js';
import type { PassportData } from './types.js';

export const PassportDocument: React.FC<{ data: PassportData }> = ({ data }) => (
  <div className="mt-5 space-y-6 text-sm">
    {isSample(data) && <SampleNotice />}

    <div className="space-y-3">
      <div className="min-w-0">
        <div className="font-semibold text-ink break-words">{data.employeeInfo.fullName}</div>
        <div className="text-ink-2 text-xs mt-0.5 break-words">{data.employeeInfo.roleTitle}</div>
      </div>
      <blockquote className="border-l border-line pl-3 text-ink-2 italic max-w-prose">
        "{data.executiveSummary}"
      </blockquote>
    </div>

    <AccommodationList items={data.formalAccommodations} />
    <ManagerQuickReference reference={data.managerQuickReference} />
  </div>
);
