import type React from "react";
import { i18n } from "@/lib/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: [locale] }));
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang?: string[] } }) {
  // This layout just passes through the children
  // The HTML structure is handled by the root layout
  return children;
}
