"use client";

import { motion } from "framer-motion";
import { Flag, Target, Eye, Gem, Users, ShieldCheck, BrainCircuit } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Dictionary = {
  title: string;
  timeline: {
    founding: {
      date: string;
      title: string;
      text: string;
    };
    mission: {
      date: string;
      title: string;
      text: string;
    };
    vision: {
      date: string;
      title: string;
      text: string;
    };
  };
  values_title: string;
  values: {
    quality: { title: string; text: string };
    service: { title: string; text: string };
    trust: { title: string; text: string };
    innovation: { title: string; text: string };
  };
};

const TimelineItem = ({
  icon: Icon,
  date,
  title,
  text,
  isLast = false,
}: {
  icon: LucideIcon;
  date: string;
  title: string;
  text: string;
  isLast?: boolean;
}) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div variants={variants} className="relative flex items-start gap-6 md:gap-8">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
          <Icon className="h-6 w-6" />
        </div>
        {!isLast && <div className="mt-2 w-px flex-grow bg-gray-300" style={{ minHeight: "12rem" }} />}
      </div>
      <div className="pt-2 pb-12">
        <p className="text-sm font-semibold text-primary">{date}</p>
        <h3 className="mt-1 text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-gray-600">{text}</p>
      </div>
    </motion.div>
  );
};

const ValueCard = ({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{text}</p>
    </motion.div>
  );
};

export default function MissionVisionSection({ dictionary }: { dictionary: Dictionary }) {
  const timelineItems = [
    {
      icon: Flag,
      ...dictionary.timeline.founding,
    },
    {
      icon: Target,
      ...dictionary.timeline.mission,
    },
    {
      icon: Eye,
      ...dictionary.timeline.vision,
    },
  ];

  const valueItems = [
    { icon: Gem, ...dictionary.values.quality },
    { icon: Users, ...dictionary.values.service },
    { icon: ShieldCheck, ...dictionary.values.trust },
    { icon: BrainCircuit, ...dictionary.values.innovation },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">{dictionary.title}</h2>
        </motion.div>

        <div className="relative mx-auto max-w-2xl">
          {timelineItems.map((item, index) => (
            <TimelineItem key={index} {...item} isLast={index === timelineItems.length - 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-28 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">{dictionary.values_title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valueItems.map((item, index) => (
            <ValueCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
