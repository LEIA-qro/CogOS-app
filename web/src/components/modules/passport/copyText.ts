// Arma el texto del passport para copiar
import { isSample } from '../../SampleNotice.js';
import type { PassportData } from './types.js';

const SAMPLE_COPY_LINE = 'SAMPLE - not based on what was entered.';

export const buildPassportCopyText = (data: PassportData): string => {
  const lines: string[] = [];
  if (isSample(data)) lines.push(SAMPLE_COPY_LINE, '');
  lines.push(`ACCOMMODATION PASSPORT - ${data.employeeInfo.fullName}`);
  lines.push(`Role: ${data.employeeInfo.roleTitle}`);
  lines.push('', 'SUMMARY:', data.executiveSummary);
  lines.push('', 'ACCOMMODATIONS:');
  data.formalAccommodations.forEach((a) => {
    lines.push(`- [${a.category}] ${a.reasonableAccommodation}`);
    lines.push(`  Impact: ${a.impactOnRetention}`);
  });
  lines.push('', 'MANAGER QUICK REFERENCE');
  lines.push('Do:');
  data.managerQuickReference.doList.forEach((d) => lines.push(`- ${d}`));
  lines.push("Don't:");
  data.managerQuickReference.dontList.forEach((d) => lines.push(`- ${d}`));
  return lines.join('\n');
};
