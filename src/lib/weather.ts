/**
 * Server-side weather helper.
 *
 * Fetches current conditions and a multi-day forecast for the monument's
 * coordinates and returns normalized, localized data for display.
 *
 * The data source is a public, key-less meteorological API. The source name is
 * intentionally kept out of the user-facing strings — visitors only care whether
 * the forecast is reliable and whether they should carry an umbrella.
 */

import { siteConfig } from '@/config';

export type Lang = 'el' | 'en' | 'zh';

export interface DayForecast {
  date: string;
  code: number;
  label: string;
  icon: string;
  tmaxC: number;
  tminC: number;
  precipProb: number;
  uv: number;
}

export interface CurrentWeather {
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

export interface WeatherPayload {
  current: CurrentWeather;
  daily: DayForecast[];
  umbrella: boolean;
  updatedAt: string;
}

/**
 * WMO weather interpretation codes mapped to a localized label, a display icon
 * and a coarse category used to decide the umbrella advice.
 */
const WMO: Record<number, { el: string; en: string; zh: string; icon: string; rain: boolean }> = {
  0: { el: 'Καθαρός ουρανός', en: 'Clear sky', zh: '晴朗', icon: '☀️', rain: false },
  1: { el: 'Κυρίως ηλιοφανής', en: 'Mainly clear', zh: '晴间多云', icon: '🌤️', rain: false },
  2: { el: 'Μερικώς συννεφιασμένο', en: 'Partly cloudy', zh: '局部多云', icon: '⛅', rain: false },
  3: { el: 'Συννεφιασμένο', en: 'Overcast', zh: '阴', icon: '☁️', rain: false },
  45: { el: 'Ομίχλη', en: 'Fog', zh: '雾', icon: '🌫️', rain: false },
  48: { el: 'Παγωμένη ομίχλη', en: 'Rime fog', zh: '冻雾', icon: '🌫️', rain: false },
  51: { el: 'Ασθενής ψιχάλα', en: 'Light drizzle', zh: '小毛毛雨', icon: '🌦️', rain: true },
  53: { el: 'Ψιχάλα', en: 'Drizzle', zh: '毛毛雨', icon: '🌦️', rain: true },
  55: { el: 'Πυκνή ψιχάλα', en: 'Dense drizzle', zh: '浓毛毛雨', icon: '🌧️', rain: true },
  56: { el: 'Παγωμένη ψιχάλα', en: 'Freezing drizzle', zh: '冻毛毛雨', icon: '🌧️', rain: true },
  57: { el: 'Πυκνή παγωμένη ψιχάλα', en: 'Dense freezing drizzle', zh: '浓冻毛毛雨', icon: '🌧️', rain: true },
  61: { el: 'Ασθενής βροχή', en: 'Slight rain', zh: '小雨', icon: '🌦️', rain: true },
  63: { el: 'Βροχή', en: 'Rain', zh: '中雨', icon: '🌧️', rain: true },
  65: { el: 'Καταρρακτώδης βροχή', en: 'Heavy rain', zh: '大雨', icon: '🌧️', rain: true },
  66: { el: 'Παγωμένη βροχή', en: 'Freezing rain', zh: '冻雨', icon: '🌧️', rain: true },
  67: { el: 'Πυκνή παγωμένη βροχή', en: 'Heavy freezing rain', zh: '强冻雨', icon: '🌧️', rain: true },
  71: { el: 'Ασθενής χιονόπτωση', en: 'Slight snow', zh: '小雪', icon: '🌨️', rain: true },
  73: { el: 'Χιονόπτωση', en: 'Snow', zh: '中雪', icon: '🌨️', rain: true },
  75: { el: 'Πυκνή χιονόπτωση', en: 'Heavy snow', zh: '大雪', icon: '❄️', rain: true },
  77: { el: 'Χιονονιφάδες', en: 'Snow grains', zh: '雪粒', icon: '🌨️', rain: true },
  80: { el: 'Ασθενείς καταιγίδες βροχής', en: 'Slight rain showers', zh: '小阵雨', icon: '🌦️', rain: true },
  81: { el: 'Καταιγίδες βροχής', en: 'Rain showers', zh: '阵雨', icon: '🌧️', rain: true },
  82: { el: 'Βίαιες καταιγίδες βροχής', en: 'Violent rain showers', zh: '强阵雨', icon: '⛈️', rain: true },
  85: { el: 'Ασθενείς καταιγίδες χιονιού', en: 'Slight snow showers', zh: '小阵雪', icon: '🌨️', rain: true },
  86: { el: 'Καταιγίδες χιονιού', en: 'Snow showers', zh: '阵雪', icon: '❄️', rain: true },
  95: { el: 'Καταιγίδα', en: 'Thunderstorm', zh: '雷阵雨', icon: '⛈️', rain: true },
  96: { el: 'Καταιγίδα με χαλάζι', en: 'Thunderstorm with hail', zh: '雷阵雨伴冰雹', icon: '⛈️', rain: true },
  99: { el: 'Καταιγίδα με ισχυρό χαλάζι', en: 'Thunderstorm with heavy hail', zh: '强雷暴伴冰雹', icon: '⛈️', rain: true },
};

function describe(code: number, lang: Lang) {
  const hit = WMO[code] ?? WMO[3];
  const label = hit[lang] ?? hit.en;
  return { label, icon: hit.icon, rain: hit.rain };
}

/** Convert a wind speed in km/h to the Beaufort scale (0–12). */
export function toBeaufort(kmh: number): number {
  const thresholds = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  let bft = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (kmh >= thresholds[i]) bft = i + 1;
  }
  return bft;
}

function round(n: number | undefined): number {
  if (typeof n !== 'number' || Number.isNaN(n)) return 0;
  return Math.round(n);
}

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    precipitation_probability?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    uv_index_max?: number[];
  };
}

/**
 * Fetch live conditions + a 7-day forecast and return a normalized payload.
 * `umbrella` is true when active/precipitation is likely, derived from the
 * weather code and the precipitation-probability forecast.
 */
export async function getWeather(lang: Lang): Promise<WeatherPayload> {
  const { latitude, longitude } = siteConfig;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max` +
    `&wind_speed_unit=kmh&timezone=auto&forecast_days=7`;

  const res = await fetch(url, {
    // Cache reused across requests within the same runtime instance.
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.status}`);
  }

  const data = (await res.json()) as OpenMeteoResponse;
  const c = data.current ?? {};
  const curCode = c.weather_code ?? 3;
  const curDesc = describe(curCode, lang);
  const curPrecip = c.precipitation_probability ?? 0;

  const daily: DayForecast[] = (data.daily?.time ?? []).map((date, i) => {
    const code = data.daily!.weather_code?.[i] ?? 3;
    const d = describe(code, lang);
    return {
      date,
      code,
      label: d.label,
      icon: d.icon,
      tmaxC: round(data.daily!.temperature_2m_max?.[i]),
      tminC: round(data.daily!.temperature_2m_min?.[i]),
      precipProb: round(data.daily!.precipitation_probability_max?.[i]),
      uv: round(data.daily!.uv_index_max?.[i]),
    };
  });

  const umbrella = curDesc.rain || curPrecip >= 50;

  return {
    current: {
      tempC: round(c.temperature_2m),
      feelsC: round(c.apparent_temperature),
      humidity: round(c.relative_humidity_2m),
      windKmh: round(c.wind_speed_10m),
      windBft: toBeaufort(c.wind_speed_10m ?? 0),
      windDeg: round(c.wind_direction_10m),
      code: curCode,
      label: curDesc.label,
      icon: curDesc.icon,
      precipProb: curPrecip,
      uv: round(data.daily?.uv_index_max?.[0]),
    },
    daily,
    umbrella,
    updatedAt: new Date().toISOString(),
  };
}
