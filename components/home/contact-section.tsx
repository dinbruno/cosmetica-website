"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, Loader2, MessageCircle, Clock } from "lucide-react"; // Added MessageCircle, Clock
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions/contact";
import { useEffect, useRef } from "react";
import CosmeticaMap from "@/components/map/cosmetica-map";

type Dictionary = {
  title: {
    part1: string;
    highlight: string;
    part2: string;
  };
  subtitle: string;
  name: string;
  email: string;
  message: string;
  send_button: string;
  find_us: string;
  address_label: string;
  phone_label: string;
  email_label: string;
  whatsapp_label: string;
  opening_hours_label: string;
  weekdays: string;
  saturdays: string;
  view_on_google_maps: string;
};

const initialState = {
  message: "",
  success: false,
};

const WHATSAPP_NUMBER = "5541996949516";
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de mais informações.`;

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-xl py-3 text-base" size="lg" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
      {text}
    </Button>
  );
}

export default function ContactSection({ dictionary }: { dictionary: Dictionary }) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {dictionary.title.part1}
            <span className="bg-primary text-primary-foreground px-4 py-1 shadow-lg mx-2 inline-block">{dictionary.title.highlight}</span>
            {dictionary.title.part2}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{dictionary.subtitle}</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gray-50 p-8 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{dictionary.find_us}</h3>
            <div className="space-y-5 text-gray-700">
              <div className="flex items-start gap-4">
                <MapPin className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{dictionary.address_label}</h4>
                  <p>R. Dep. Antônio Baby, 87</p>
                  <p>CEP 80240-370 | Batel - Curitiba - PR, Brasil</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{dictionary.phone_label}</h4>
                  <a href="tel:+554133437318" className="hover:text-primary">
                    (41) 3343-7318
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{dictionary.whatsapp_label}</h4>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    (41) 99694-9516
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{dictionary.email_label}</h4>
                  <a href="mailto:cosmetica@cosmetica.far.br" className="hover:text-primary">
                    cosmetica@cosmetica.far.br
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{dictionary.opening_hours_label}</h4>
                  <p>{dictionary.weekdays}: 08:00 - 19:00</p>
                  <p>{dictionary.saturdays}: 08:00 - 13:00</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.form
            ref={formRef}
            action={formAction}
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-3 bg-gray-50 p-8 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {dictionary.name}
              </label>
              <Input id="name" name="name" placeholder="Seu nome completo" className="rounded-lg py-3 px-4" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {dictionary.email}
              </label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" className="rounded-lg py-3 px-4" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {dictionary.message}
              </label>
              <Textarea id="message" name="message" placeholder="Digite sua mensagem aqui..." rows={5} className="rounded-lg py-3 px-4" required />
            </div>
            <SubmitButton text={dictionary.send_button} />
            {state?.message && <p className={`mt-4 text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>}
          </motion.form>
        </div>

        {/* Mapa */}
        <div className="mt-16">
          <CosmeticaMap dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
}
