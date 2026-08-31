import { useTranslations, useMessages } from 'next-intl';

export default function HistorySection() {
  const t = useTranslations('history');
  const messages = useMessages() as any;
  const events = (messages?.history?.events || []) as Array<{ era: string; title: string; text: string }>;

  return (
    <section id="history" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="relative">
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block"
            style={{ background: 'var(--border-color)' }}
          />
          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={i} className="relative flex gap-4 sm:pl-4">
                <div
                  className="hidden sm:flex absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex-shrink-0"
                  style={{ background: 'var(--accent)', borderColor: 'var(--accent)', top: '0.35rem' }}
                />
                <div
                  className="flex-shrink-0 w-20 sm:w-24 text-right text-sm font-semibold pt-1"
                  style={{ color: 'var(--accent)' }}
                >
                  {event.era}
                </div>
                <div
                  className="flex-1 rounded-xl p-5"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {event.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {event.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          className="mt-8 text-xs leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
