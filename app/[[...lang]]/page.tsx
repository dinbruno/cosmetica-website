import { getDictionary } from "@/lib/dictionaries";
import { i18n, type Locale } from "@/lib/i18n-config";
import Header from "@/components/header";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import ProfessionalsSection from "@/components/home/professionals-section";
import ServicesSection from "@/components/home/services-section";
import BrandsMarquee from "@/components/home/brands-marquee";
// import PartnersSection from "@/components/home/partners-section" // Removed
import CosmeticaMap from "@/components/map/cosmetica-map";
import ContactSection from "@/components/home/contact-section";
import Footer from "@/components/footer";
import MissionPage from "@/components/mission-page";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ lang?: string[] }> }) {
  const resolvedParams = await params;
  const segments = resolvedParams.lang || [];
  let lang: Locale = i18n.defaultLocale;
  let page = "home";

  // Parse the segments to determine language and page
  if (segments.length === 0) {
    // Root path: use default language, show home
    lang = i18n.defaultLocale;
    page = "home";
  } else if (segments.length === 1) {
    // Could be language or page
    if (i18n.locales.includes(segments[0] as Locale)) {
      // It's a language
      lang = segments[0] as Locale;
      page = "home";
    } else if (segments[0] === "mission") {
      // It's the mission page with default language
      lang = i18n.defaultLocale;
      page = "mission";
    } else {
      // Unknown route
      notFound();
    }
  } else if (segments.length === 2) {
    // Should be [lang, page]
    if (i18n.locales.includes(segments[0] as Locale) && segments[1] === "mission") {
      lang = segments[0] as Locale;
      page = "mission";
    } else {
      // Unknown route
      notFound();
    }
  } else {
    // Too many segments
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  // Render the appropriate page
  if (page === "mission") {
    return <MissionPage lang={lang} dict={dict} />;
  }

  // Default home page
  return (
    <main className="flex flex-col min-h-screen">
      <Header dictionary={dict.header} lang={lang} />
      <HeroSection dictionary={dict.hero} />
      <AboutSection dictionary={dict.about} />
      <ProfessionalsSection dictionary={dict.professionals} />
      <ServicesSection dictionary={dict.services} />
      <BrandsMarquee dictionary={dict.brands} />
      {/* <PartnersSection dictionary={dict.partners} /> // Removed */}
      <ContactSection dictionary={dict.contact} />
      <CosmeticaMap dictionary={dict.contact} />
      <Footer dictionary={dict.footer} lang={lang} />
    </main>
  );
}
