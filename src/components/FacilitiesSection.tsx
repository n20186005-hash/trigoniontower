'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
  restrooms: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 15l-2-6a4 4 0 0 1 8 0l2 6" />
      <path d="M9 21h6" />
    </svg>
  ),
  parking: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M10 17V7h4a3 3 0 0 1 0 6h-4" />
    </svg>
  ),
  dining: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a2 2 0 0 0 4 0V3" />
      <path d="M8 10v11" />
      <path d="M17 3c-1.6 2-2.4 4.2-2.4 6.2 0 2 1 3.3 2.4 3.3V21" />
    </svg>
  ),
  lodging: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18V7" />
      <path d="M21 18v-6a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v6" />
      <path d="M3 18h18" />
      <circle cx="7.5" cy="10.5" r="1.5" />
    </svg>
  ),
  shopping: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2l-2 4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4H6z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  fuel: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="10" height="18" rx="2" />
      <path d="M4 21h10" />
      <path d="M7 7h4" />
      <path d="M14 9h3a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-4" />
    </svg>
  ),
  comfort: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
      <path d="M12 12v9" />
    </svg>
  ),
  accessibility: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M9 21l1.6-6.6L8 13l1-8h6l1 8-2.6 1.4L15 21" />
      <circle cx="12.5" cy="16" r="4" />
    </svg>
  ),
  medical: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
};

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    id: string;
    type: string;
    desc: string;
    tip?: string;
  }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl p-4 sm:p-5 flex items-start gap-3 mb-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('note')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {icons[item.id] || icons.comfort}
                </span>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.type}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
              {item.tip && (
                <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.tip}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
