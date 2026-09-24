import { NextRequest, NextResponse } from 'next/server';
import { getWeather, type Lang, type WeatherPayload } from '@/lib/weather';

// Keep the route dynamic so it always reflects live conditions.
export const dynamic = 'force-dynamic';

function resolveLang(input: string | null): Lang {
  return input === 'el' || input === 'zh' ? input : 'en';
}

/**
 * Returns live weather for the monument. The response is cached at the edge
 * (Cloudflare Cache API) for ~10 minutes so repeated requests are cheap and the
 * upstream is not hammered.
 */
export async function GET(req: NextRequest) {
  const lang = resolveLang(req.nextUrl.searchParams.get('lang'));
  const cacheKey = new Request(
    `${req.nextUrl.origin}/api/weather?lang=${lang}`,
    { method: 'GET' }
  );

  try {
    const cache = (globalThis as any).caches?.default;
    if (cache) {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    }

    const payload: WeatherPayload = await getWeather(lang);
    const body = JSON.stringify(payload);

    const headers = new Headers({
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=600, s-maxage=600',
    });
    const response = new NextResponse(body, { status: 200, headers });

    if (cache) {
      // Clone before handing off; the original stream is consumed by the response.
      await cache.put(cacheKey, response.clone());
    }
    return response;
  } catch {
    // Neutral failure: never leak upstream details to the visitor.
    return NextResponse.json(
      { error: 'unavailable' },
      { status: 503, headers: { 'cache-control': 'no-store' } }
    );
  }
}
