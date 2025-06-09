import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { i18n } from "@/lib/i18n-config";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmética - Farmácia de Manipulação",
  description:
    "Inovação e cuidado personalizado em cada fórmula. Saúde e bem-estar com a tradição da manipulação magistral e a mais alta tecnologia.",
  keywords: "farmácia de manipulação, cosméticos, medicamentos manipulados, saúde, bem-estar, curitiba, pet",
  // Open Graph Meta Tags for better SEO and social sharing
  openGraph: {
    title: "Cosmética - Farmácia de Manipulação",
    description: "Inovação e cuidado personalizado em cada fórmula.",
    type: "website",
    locale: "pt_BR", // Default locale
    // url: "YOUR_WEBSITE_URL", // Replace with your actual URL
    siteName: "Cosmética Farmácia de Manipulação",
    // images: [
    //   {
    //     url: "YOUR_OG_IMAGE_URL", // Replace with a link to a compelling OG image
    //     width: 1200,
    //     height: 630,
    //     alt: "Cosmética Farmácia de Manipulação",
    //   },
    // ],
  },
  // Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Cosmética - Farmácia de Manipulação",
    description: "Inovação e cuidado personalizado em cada fórmula.",
    // images: ["YOUR_TWITTER_IMAGE_URL"], // Replace with your Twitter image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body className={cn("bg-white text-gray-800 antialiased", montserrat.className)} suppressHydrationWarning={true}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
