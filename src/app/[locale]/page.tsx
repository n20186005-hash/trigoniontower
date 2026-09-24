import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TableOfContents from '@/components/TableOfContents';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import WeatherSection from '@/components/WeatherSection';
import InfoSection from '@/components/InfoSection';
import HistorySection from '@/components/HistorySection';
import HeritageSection from '@/components/HeritageSection';
import LegendsSection from '@/components/LegendsSection';
import RouteSection from '@/components/RouteSection';
import ItinerariesSection from '@/components/ItinerariesSection';
import SeasonalStrategySection from '@/components/SeasonalStrategySection';
import FacilitiesSection from '@/components/FacilitiesSection';
import EtiquetteSection from '@/components/EtiquetteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TableOfContents />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherSection />
        <InfoSection />
        <HistorySection />
        <HeritageSection />
        <LegendsSection />
        <RouteSection />
        <ItinerariesSection />
        <SeasonalStrategySection />
        <FacilitiesSection />
        <EtiquetteSection />
        <PhotoSpotsSection />
        <Gallery />
        <Reviews />
        <FAQ />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
