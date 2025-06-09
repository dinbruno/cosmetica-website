"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Dictionary = {
  title: {
    part1: string;
    highlight: string;
    part2: string;
  };
  text: string;
  button_text: string; // Added for button text
};

const aboutImages = [
  {
    src: "/images/about/pharmacist-handling-vial.avif",
    alt: "Farmacêutica Cosmética manuseando um frasco com precisão",
    className: "z-10 col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-1 md:row-span-3 rounded-2xl sm:rounded-3xl shadow-2xl",
    parallaxFactor: 30,
  },
  {
    src: "/images/about/modern-laboratory.avif",
    alt: "Laboratório moderno da Cosmética Farmácia",
    className: "z-20 col-start-1 row-start-3 sm:col-start-2 sm:row-start-2 md:col-start-1 md:row-start-3 rounded-xl sm:rounded-2xl shadow-xl",
    parallaxFactor: -20,
  },
  {
    src: "/images/about/smiling-pharmacist.avif",
    alt: "Farmacêutica Cosmética sorrindo durante atendimento",
    className:
      "z-0 col-start-2 row-start-3 sm:col-start-1 sm:row-start-1 md:col-start-2 md:row-start-1 rounded-xl sm:rounded-2xl shadow-lg opacity-90",
    parallaxFactor: 10,
  },
];

export default function AboutSection({ dictionary }: { dictionary: Dictionary }) {
  const { scrollYProgress } = useScroll();

  // Create useTransform hooks at the top level
  const imageParallaxValues = aboutImages.map((img) => {
    return useTransform(scrollYProgress, [0, 1], ["0%", `${img.parallaxFactor}%`]);
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const textContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const individualImageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, rotate: 2 },
    visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 xl:py-40 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      <motion.div
        className="absolute top-10 -left-20 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-40"
        animate={{ x: [-30, 30, -30], y: [-15, 15, -15], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl opacity-50"
        animate={{ x: [25, -25, 25], y: [10, -10, 10], rotate: [0, 180, 0] }}
        transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 3 }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={textContentVariants} className="lg:pr-8 order-last lg:order-first">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">
              {dictionary.title.part1}
              <span className="bg-primary text-primary-foreground px-2 sm:px-4 py-1 shadow-lg mx-1 sm:mx-2 inline-block text-2xl sm:text-3xl lg:text-4xl xl:text-[3.4rem]">
                {dictionary.title.highlight}
              </span>
              {dictionary.title.part2}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-10 whitespace-pre-line">{dictionary.text}</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="rounded-xl px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <Link href="/mission">{dictionary.button_text}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageContainerVariants}
            className="relative grid grid-cols-2 grid-rows-3 gap-2 sm:gap-4 min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] lg:order-last"
          >
            {aboutImages.map((img, index) => (
              <motion.div
                key={index}
                variants={individualImageVariants}
                className={`relative overflow-hidden ${img.className}`}
                style={{ y: imageParallaxValues[index] }}
                whileHover={{ scale: 1.03, zIndex: 30, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image src={img.src || "/placeholder.svg"} alt={img.alt} layout="fill" className="object-cover" quality={85} />
              </motion.div>
            ))}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 border-2 sm:border-4 border-white/30 rounded-full z-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
