'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

interface OptionDef {
  key: string;
  icon: ReactNode;
}

const options: OptionDef[] = [
  {
    key: 'fromAirport',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2 .5-3.5 2L14.5 9.5l-8.2-1.8c-.8-.2-1.6.3-1.8 1.1-.2.8.3 1.6 1.1 1.8l6.3 1.4-3.4 3.4-2.8-.7c-.6-.2-1.2.1-1.4.7-.2.6.1 1.2.7 1.4l3.5.9 1.4 3.5c.2.6.8.9 1.4.7.6-.2.9-.8.7-1.4l-.7-2.8 3.4-3.4 1.4 6.3c.2.8 1 1.3 1.8 1.1.8-.2 1.3-1 1.1-1.8z" />
      </svg>
    ),
  },
  {
    key: 'taxi',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
        <path d="M5 11h14v5H5z" />
        <path d="M7 16v2M17 16v2" />
        <circle cx="8" cy="18" r="1.2" />
        <circle cx="16" cy="18" r="1.2" />
      </svg>
    ),
  },
  {
    key: 'fromStation',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    key: 'publicTransport',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <circle cx="8" cy="15" r="1" />
        <circle cx="16" cy="15" r="1" />
      </svg>
    ),
  },
  {
    key: 'fromCenter',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 22h20L12 2z" />
        <circle cx="12" cy="15" r="3" />
      </svg>
    ),
  },
  {
    key: 'walking',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3 7h-6l3-7z" />
        <path d="M12 9v13" />
        <path d="M8 17l4 4 4-4" />
        <path d="M5 22h14" />
      </svg>
    ),
  },
  {
    key: 'driving',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 3v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3" />
        <path d="M14 6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6" />
        <path d="M4 20h16" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
];

export default function TransportSection() {
  const t = useTranslations('transport');
  const messages = useMessages() as any;

  return (
    <section id="transport" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {options.map((option) => {
            const steps = (messages?.transport?.[`${option.key}Steps`] || []) as string[];
            return (
              <div
                key={option.key}
                className="rounded-xl p-5"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    {option.icon}
                  </span>
                  <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                    {t(option.key as any)}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {t(`${option.key}Desc` as any)}
                </p>
                {steps.length > 0 && (
                  <ul className="space-y-1.5">
                    {steps.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span style={{ color: 'var(--accent)' }}>•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
