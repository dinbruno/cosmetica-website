"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"
import { useEffect, useState } from "react"

type Dictionary = {
  subtitle: string
  quote_button: string // Added for button text
}

const WHATSAPP_NUMBER = "5541996949516"
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de fazer um orçamento.`

export default function HeroSection({ dictionary }: { dictionary: Dictionary }) {
  const { scrollYProgress } = useScroll()
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024) // lg breakpoint
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const imageClipPath = isMobile
    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
    : "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-slate-50 via-gray-100 to-stone-100"
    >
      <motion.div
        style={{ opacity: contentOpacity }}
        className="w-full lg:w-[45%] h-full order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start p-8 sm:p-12 md:p-16 lg:p-20 text-center lg:text-left"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full"
        >
          <TypeAnimation
            sequence={["QUALIDADE E ÉTICA", 3000, "ATENDIMENTO PERSONALIZADO", 3000, "TRATAMENTO ESPECIALIZADO", 3000]}
            wrapper="h1"
            cursor={true}
            repeat={Number.POSITIVE_INFINITY}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6"
            style={{ minHeight: "130px" }}
          />
          <p className="text-lg sm:text-xl text-gray-700 max-w-md mb-10 mx-auto lg:mx-0">{dictionary.subtitle}</p>
          <Button
            size="lg"
            className="px-10 py-4 text-base rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform duration-300"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              {dictionary.quote_button}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <div className="w-full lg:w-[55%] h-[45vh] min-h-[320px] lg:h-full relative order-1 lg:order-2">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: imageClipPath,
            y: imageY,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Image
            src="/images/new-hero-banner.avif"
            alt="Banner Cosmética Farmácia de Manipulação"
            layout="fill"
            objectFit="cover"
            quality={90}
            priority
            className="scale-105"
          />
          <div
            className="absolute inset-0 z-10 opacity-[0.03]"
            style={{ backgroundImage: "url('/images/noise.png')" }}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ArrowDown className="w-7 h-7 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
