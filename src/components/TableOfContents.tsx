'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function TableOfContents() {
  const t = useTranslations('toc');
  const messages = useMessages() as any;
  const items = (messages?.toc?.items || []) as Array<{ id: string; label: string }>;

  return (
    <section
      className="py-10 sm:py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <p
          className="font-display text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </p>
        <nav aria-label={t('title')}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-sm hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
