'use client';

import { useTranslations, useMessages } from 'next-intl';

interface SeasonRow {
  season: string;
  weather: string;
  bestFor: string;
  tip: string;
}

export default function SeasonalStrategySection() {
  const t = useTranslations('seasonal');
  const messages = useMessages() as any;
  const rows = (messages?.seasonal?.rows || []) as SeasonRow[];

  return (
    <section id="seasonal" className="section-padding">
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
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-xl"
          style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('colSeason')}
                </th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('colWeather')}
                </th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('colBestFor')}
                </th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('colTip')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.season} style={{ background: i % 2 ? 'var(--bg-secondary)' : 'var(--bg-tertiary)' }}>
                  <td className="p-4 align-top font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {row.season}
                  </td>
                  <td className="p-4 align-top" style={{ color: 'var(--text-secondary)' }}>
                    {row.weather}
                  </td>
                  <td className="p-4 align-top" style={{ color: 'var(--text-secondary)' }}>
                    {row.bestFor}
                  </td>
                  <td className="p-4 align-top" style={{ color: 'var(--text-muted)' }}>
                    {row.tip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div
              key={row.season}
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {row.season}
              </h3>
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium">{t('colWeather')}: </span>
                {row.weather}
              </p>
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium">{t('colBestFor')}: </span>
                {row.bestFor}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="font-medium">{t('colTip')}: </span>
                {row.tip}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('source')}
        </p>
      </div>
    </section>
  );
}
