import React from 'react';
import { cx } from '../../ui/index.js';
import type { UrgencyStyle } from './urgency.js';

export const UrgencyChip: React.FC<{ urgency: UrgencyStyle }> = ({ urgency }) => (
  <span className={cx('inline-flex items-center h-6 px-2 rounded-md text-xs font-medium', urgency.className)}>
    {urgency.label}
  </span>
);
