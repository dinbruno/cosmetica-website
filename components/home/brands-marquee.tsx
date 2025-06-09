"use client";

import Image from "next/image";

type Dictionary = {
  title: {
    part1: string;
    highlight: string;
    part2: string;
  };
};

const brands = [
  { name: "Brand 1", logo: "/marcas/d075bb_6453e817fd26437280af3e78b00e1d2b~mv2.avif" },
  { name: "Brand 2", logo: "/marcas/d075bb_7d7e850475ec4c808e475aa13be76903~mv2.avif" },
  { name: "Brand 3", logo: "/marcas/d075bb_83b7631c6afc4b849af3e5a6851a603d~mv2.avif" },
  { name: "Brand 4", logo: "/marcas/d075bb_867a74c5fece472bae05d1f06678a992~mv2.avif" },
  { name: "Brand 5", logo: "/marcas/d075bb_92e5406a7422402d8e48a4e71d58365b~mv2.avif" },
  { name: "Brand 6", logo: "/marcas/d075bb_9aea1d1066d847d6afbf9003e689a6a6~mv2_d_2000_1334_s_2.avif" },
  { name: "Brand 7", logo: "/marcas/d075bb_a40bdbbd38204a8a817b82e308db708d~mv2.avif" },
  { name: "Brand 8", logo: "/marcas/d075bb_de72d713c85a494989a327349bb04a73~mv2.avif" },
  { name: "Brand 9", logo: "/marcas/d075bb_e8a8fce8b3ed47d89271a5e37bc93ad1~mv2.avif" },
  { name: "Brand 10", logo: "/marcas/d075bb_f039b36dca72498ca1de1afa480a58b6~mv2.avif" },
];

export default function BrandsMarquee({ dictionary }: { dictionary: Dictionary }) {
  // Temporarily use just the original brands for testing
  const extendedBrands = brands;

  return (
    <div className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-700 mb-12">
          {dictionary.title.part1}
          <span className="bg-primary text-primary-foreground px-3 py-1 shadow-md mx-2 inline-block">{dictionary.title.highlight}</span>
          {dictionary.title.part2}
        </h2>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee group-hover:pause">
            {extendedBrands.map((brand, index) => {
              // Fallback to first image if brand.logo is undefined
              const imageSrc = brand.logo || "/marcas/d075bb_6453e817fd26437280af3e78b00e1d2b~mv2.avif";

              return (
                <div key={index} className="flex-shrink-0  flex items-center justify-center mx-1 sm:mx-3 md:mx-6 h-20">
                  <Image
                    src={imageSrc}
                    alt={brand.name || `Brand ${index + 1}`}
                    width={180}
                    height={70}
                    className="object-contain max-h-12 sm:max-h-14 md:max-h-16 max-w-32 sm:max-w-36 md:max-w-40 grayscale hover:grayscale-0 transition-all duration-300"
                    priority={index < 10}
                    unoptimized={true}
                    onError={(e) => {
                      console.error("Error loading image:", imageSrc, e);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
