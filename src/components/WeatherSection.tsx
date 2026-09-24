'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

interface DayForecast {
  date: string;
  code: number;
  label: string;
  icon: string;
  tmaxC: number;
  tminC: number;
  precipProb: number;
  uv: number;
}

interface CurrentWeather {
  tempC: number;
  feelsC: number;
  humidity: number;
  windKmh: number;
  windBft: number;
  windDeg: number;
  code: number;
  label: string;
  icon: string;
  precipProb: number;
  uv: number;
}

interface WeatherData {
  current: CurrentWeather;
  daily: DayForecast[];
  umbrella: boolean;
  updatedAt: string;
}

function weekdayLabel(dateStr: string, locale: string): string {
  // dateStr is YYYY-MM-DD; render a short weekday without timezone surprises.
  const parts = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  return d.toLocaleDateString(locale, { weekday: 'short', timeZone: 'UTC' });
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    fetch(`/api/weather?lang=${locale}`)
      .then((r) => {
        if (!r.ok) throw new Error('unavailable');
        return r.json();
      })
      .then((json) => {
        if (!active) return;
        setData(json);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        {error && (
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('unavailable')}
            </p>
          </div>
        )}

        {loading && !error && (
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('loading')}
            </p>
          </div>
        )}

        {data && !error && (
          <>
            {/* Current conditions */}
            <div
              className="rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl leading-none" aria-hidden="true">
                  {data.current.icon}
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display text-4xl font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {data.current.tempC}°
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      C
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {data.current.label}
                  </p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <Metric label={t('feelsLike')} value={`${data.current.feelsC}°`} />
                <Metric label={t('humidity')} value={`${data.current.humidity}%`} />
                <Metric
                  label={t('wind')}
                  value={`${data.current.windKmh} km/h`}
                  sub={`Bft ${data.current.windBft}`}
                />
                <Metric label={t('precip')} value={`${data.current.precipProb}%`} />
              </div>
            </div>

            {/* Umbrella advice strip */}
            <div
              className="rounded-xl p-4 mb-6 flex items-start gap-3"
              style={{
                background: data.umbrella ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span className="text-xl" aria-hidden="true">
                {data.umbrella ? '☔' : '🌤️'}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {data.umbrella ? t('bringUmbrella') : t('noUmbrella')}
              </p>
            </div>

            {/* 7-day forecast */}
            <h3 className="font-semibold mb-3 text-lg" style={{ color: 'var(--text-primary)' }}>
              {t('forecast7')}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {data.daily.slice(0, 7).map((d) => (
                <div
                  key={d.date}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {weekdayLabel(d.date, locale)}
                  </p>
                  <div className="text-2xl leading-none mb-1" aria-hidden="true">
                    {d.icon}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {d.tmaxC}°
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {d.tminC}°
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                    {t('precip')} {d.precipProb}%
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
              {t('updated')}:{' '}
              {new Date(data.updatedAt).toLocaleString(locale, {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'short',
              })}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
      {sub && (
        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
