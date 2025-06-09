"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const currentLocale = (pathname.split("/")[1] as Locale) || "pt-BR";

  const handleValueChange = (newLocale: string) => {
    router.push(redirectedPathName(newLocale as Locale));
  };

  return (
    <Select value={currentLocale} onValueChange={handleValueChange}>
      <SelectTrigger className="w-fit gap-2 border-none bg-transparent text-sm font-medium text-gray-600 hover:text-primary focus:ring-0 focus:ring-offset-0 shadow-none p-2">
        <Globe className="h-5 w-5" />
        <SelectValue placeholder="Idioma" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="pt-BR">PT-BR</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
}
