import { useTranslations, useMessages } from 'next-intl';

export default function HeritageSection() {
  const t = useTranslations('heritage');
  const messages = useMessages() as any;
  const items = (messages?.heritage?.items || []) as Array<{ name: string }>;

  return (
    <section id="heritage" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl p-5 mb-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('belongsTo')}
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg p-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.name}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
