// Lo que dice el manual contra lo que pasa
import React from 'react';
import { BookOpen, Users } from 'lucide-react';

export const PolicyVsPractice: React.FC<{ policy?: string; norm?: string }> = ({ policy, norm }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <BookOpen className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
          <span>The handbook says</span>
        </h3>
        <p className="max-w-prose text-sm leading-relaxed text-ink-2">{policy}</p>
      </div>

      <div className="space-y-2 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Users className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>In practice</span>
        </h3>
        <p className="max-w-prose text-sm leading-relaxed text-ink-2">{norm}</p>
      </div>
    </div>
    <p className="max-w-prose text-xs text-ink-3">
      Every company differs. Check with your manager or HR before relying on this.
    </p>
  </div>
);
