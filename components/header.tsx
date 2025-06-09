"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Dictionary = {
  about: string;
  mission: string;
  professionals: string;
  services: string;
  location: string;
  contact: string;
  quote_button: string;
};

const WHATSAPP_NUMBER = "5541996949516";
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de fazer um orçamento.`;

export default function Header({ dictionary, lang }: { dictionary: Dictionary; lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#about", label: dictionary.about },
    { href: `/${lang}/mission`, label: dictionary.mission },
    { href: "/#services", label: dictionary.services },
    { href: "/#professionals", label: dictionary.professionals },
    { href: "/#location", label: dictionary.location },
    { href: "/#contact", label: dictionary.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center">
              <Image src="/images/logo-cosmetica.avif" alt="Cosmética Logo" width={170} height={50} className="object-contain" priority />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-3 xl:space-x-4">
              <LanguageSwitcher />
              <Button asChild size="sm" className="rounded-lg">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  {dictionary.quote_button}
                </a>
              </Button>
            </div>
          </nav>

          <div className="lg:hidden flex items-center">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 p-2 text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Abrir menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <div className="flex flex-col items-center gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4 w-full max-w-xs rounded-lg">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  {dictionary.quote_button}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
