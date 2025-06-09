"use client";

import type React from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FlaskConical, PawPrint, Stethoscope } from "lucide-react";

type HighlightedTitle = {
  part1: string;
  highlight: string;
  part2: string;
};

type Dictionary = {
  title: HighlightedTitle;
  general_title: HighlightedTitle;
  general_text: string;
  vet_title: HighlightedTitle;
  vet_text: string;
  quote_button: string;
  pet_quote_button: string; // Added for pet specific button
};

const WHATSAPP_NUMBER = "5541996949516";
const GENERAL_WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de solicitar uma fórmula.`;
const PET_WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de solicitar uma fórmula para meu pet.`;

const ServiceCard = ({
  icon: Icon,
  title,
  text,
  imageSrc,
  imageAlt,
  buttonText,
  whatsappLink,
  align = "left",
}: {
  icon: React.ElementType;
  title: HighlightedTitle;
  text: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  whatsappLink: string;
  align?: "left" | "right";
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imageHoverVariants = {
    rest: { scale: 1, filter: "brightness(100%)" },
    hover: { scale: 1.05, filter: "brightness(110%)" },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden group"
    >
      <div className={`grid lg:grid-cols-2 items-stretch ${align === "right" ? "lg:grid-flow-col-dense" : ""}`}>
        <motion.div
          className={`relative min-h-[300px] lg:min-h-[450px] ${align === "right" ? "lg:order-last" : ""}`}
          variants={imageHoverVariants}
          whileHover="hover"
          initial="rest"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} layout="fill" className="object-cover" quality={85} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-all duration-300" />
        </motion.div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <Icon className="w-14 h-14 text-primary mb-6" />
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-5 leading-snug">
            {title.part1}
            <span className="bg-primary text-primary-foreground px-3 py-1 shadow-md mx-1 inline-block">{title.highlight}</span>
            {title.part2}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8 text-md">{text}</p>
          <Button size="lg" className="rounded-xl self-start px-8 py-3 shadow-md hover:scale-105 transition-transform" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {buttonText}
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="services" className="py-28 lg:py-40 bg-gray-100 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            {dictionary.title.part1}
            <span className="bg-primary text-primary-foreground px-4 py-1 shadow-lg mx-2 inline-block">{dictionary.title.highlight}</span>
            {dictionary.title.part2}
          </h2>
        </motion.div>

        <div className="space-y-20 lg:space-y-28">
          <ServiceCard
            icon={FlaskConical}
            title={dictionary.general_title}
            text={dictionary.general_text}
            imageSrc="/images/services/pharmacist-compounding.avif"
            imageAlt="Farmacêutica Cosmética trabalhando em laboratório de manipulação"
            buttonText={dictionary.quote_button}
            whatsappLink={GENERAL_WHATSAPP_LINK}
            align="left"
          />
          <ServiceCard
            icon={PawPrint}
            title={dictionary.vet_title}
            text={dictionary.vet_text}
            imageSrc="/images/services/vet-care-pets.png"
            imageAlt="Veterinário cuidando de um cachorro e um gato"
            buttonText={dictionary.pet_quote_button}
            whatsappLink={PET_WHATSAPP_LINK}
            align="right"
          />
        </div>
      </div>
    </section>
  );
}
