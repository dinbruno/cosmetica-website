"use client";
import { motion } from "framer-motion";

type Dictionary = {
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

const CosmeticaMap = ({ dictionary }: { dictionary: Dictionary }) => {
  // Coordenadas da Cosmética Farmácia - R. Dep. Antônio Baby, 87, Batel, Curitiba, PR
  const latitude = -25.42889;
  const longitude = -49.29;

  const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=5541996949516&text=Olá! Gostaria de mais informações.";

  return (
    <section className="w-full relative z-20" id="location">
      <div className="relative w-full h-96 md:h-[500px]">
        {/* Mapa do Google Maps */}
        <div className="absolute inset-0 w-full h-full z-0 rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.281831969883!2d-49.29000068549601!3d-25.42888998378886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce381b64cca2b%3A0x411583650f605901!2sR.%20Dep.%20Ant%C3%B4nio%20Baby%2C%2087%20-%20Batel%2C%20Curitiba%20-%20PR%2C%2080240-370%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Cosmética Farmácia"
          />
        </div>

        {/* Card de Informações com Glassmorphism */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{dictionary.find_us}</h3>
                <div className="w-12 h-1 bg-primary mt-2"></div>
              </div>

              {/* Informações da Farmácia */}
              <div>
                <h4 className="text-lg font-semibold text-primary mb-2">Cosmética Farmácia de Manipulação</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">{dictionary.address_label}:</span>
                    <br />
                    R. Dep. Antônio Baby, 87
                    <br />
                    CEP 80240-370 | Batel - Curitiba - PR, Brasil
                  </p>

                  <p>
                    <span className="font-medium">{dictionary.phone_label}:</span>{" "}
                    <a href="tel:+554133437318" className="text-primary hover:underline">
                      (41) 3343-7318
                    </a>
                  </p>

                  <p>
                    <span className="font-medium">{dictionary.whatsapp_label}:</span>{" "}
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      (41) 99694-9516
                    </a>
                  </p>

                  <p>
                    <span className="font-medium">{dictionary.email_label}:</span>{" "}
                    <a href="mailto:cosmetica@cosmetica.far.br" className="text-primary hover:underline">
                      cosmetica@cosmetica.far.br
                    </a>
                  </p>

                  <p>
                    <span className="font-medium">{dictionary.opening_hours_label}:</span>
                    <br />
                    {dictionary.weekdays}: 08:00 às 19:00
                    <br />
                    {dictionary.saturdays}: 08:00 às 13:00
                  </p>
                </div>
              </div>

              {/* Botão para Google Maps */}
              <div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 text-sm font-medium rounded-lg shadow-lg transition-colors duration-300 hover:bg-primary/90"
                >
                  {dictionary.view_on_google_maps}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CosmeticaMap;
