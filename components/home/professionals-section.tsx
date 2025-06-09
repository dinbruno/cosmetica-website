"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// Removed Firebase imports: useState, useEffect, collection, onSnapshot, query, orderBy, db
// Removed type Professional import

type Dictionary = {
  title: {
    part1: string;
    highlight: string;
    part2: string;
  };
  subtitle: string;
};

// Reinstated the original mocked professionals data
const professionals = [
  {
    id: "1", // Added id for key prop consistency, though not strictly needed for mock
    name: "Maite Chiodini",
    role: "Responsável Técnica",
    crf: "CRF: 11029 PR",
    img: "/images/professionals/maite.avif",
    order: 1, // Added order for consistency, though not strictly needed for mock
  },
  {
    id: "2",
    name: "Patrícia Mocelin",
    role: "Farmacêutica",
    crf: "CRF: 10217 PR",
    img: "/images/professionals/patricia.avif",
    order: 2,
  },
  {
    id: "3",
    name: "Mariana Carneiro Ferrari",
    role: "Farmacêutica",
    crf: "CRF: 27443 PR",
    img: "/images/professionals/mariana.avif",
    order: 3,
  },
  {
    id: "4",
    name: "Jéssica da S. O. Voloch",
    role: "Farmacêutica",
    crf: "CRF: 36197 PR",
    img: "/images/professionals/jessica.avif",
    order: 4,
  },
  {
    id: "5",
    name: "Karen Adriely Griner",
    role: "Farmacêutica",
    crf: "CRF: 33605 PR",
    img: "/images/professionals/karen.avif",
    order: 5,
  },
];

export default function ProfessionalsSection({ dictionary }: { dictionary: Dictionary }) {
  // Removed useState for professionals and loading

  // Removed useEffect for fetching data from Firebase

  // Removed loading state check

  return (
    <section id="professionals" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <UserCheck className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {dictionary.title.part1}
            <span className="bg-primary text-primary-foreground px-4 py-1 shadow-lg mx-2 inline-block">{dictionary.title.highlight}</span>
            {dictionary.title.part2}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{dictionary.subtitle}</p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent>
            {professionals.map(
              (
                prof // Now mapping over the hardcoded professionals array
              ) => (
                <CarouselItem key={prof.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-primary/20 transition-shadow duration-300 aspect-[3/4]">
                      <Image
                        src={prof.img || "/placeholder.svg"}
                        alt={`Foto de ${prof.name}`}
                        layout="fill" // Changed from fill to cover for potentially better results with varying aspect ratios
                        objectFit="cover"
                        className="object-center w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold leading-tight">{prof.name}</h3>
                        <p className="text-primary-foreground/90 font-medium text-md">{prof.role}</p>
                        <p className="text-primary-foreground/70 font-light text-sm">{prof.crf}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
}
