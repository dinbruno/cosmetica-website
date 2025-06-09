import { getDictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n-config";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MissionVisionSection from "@/components/mission-vision-section";

interface MissionPageProps {
  lang: string;
  dict: any;
}

export default function MissionPage({ lang, dict }: MissionPageProps) {
  return (
    <div className="bg-gray-50">
      <Header dictionary={dict.header} lang={lang} />
      <main className="flex flex-col min-h-screen pt-20">
        <MissionVisionSection dictionary={dict.mission_page} />
      </main>
      <Footer dictionary={dict.footer} lang={lang} />
    </div>
  );
}
