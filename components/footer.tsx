import Image from "next/image";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"; // Added Clock and MessageCircle

type Dictionary = {
  rights: string;
  partners_title: string;
  quick_nav: string;
  contact_us: string;
  follow_us: string;
  company_info: string;
  technical_responsibility: string;
  licenses_authorizations: string;
  address_label: string;
  phone_label: string;
  email_label: string;
  whatsapp_label: string;
  opening_hours_label: string;
  weekdays: string;
  saturdays: string;
  nav_about: string;
  nav_pharmacy: string;
  nav_services: string;
  nav_professionals: string;
  nav_contact: string;
};

const partners = [
  { name: "Bontempo", logo: "/images/partners/bontempo-logo.avif" },
  { name: "Florien", logo: "/images/partners/florien-logo.avif" },
  { name: "Purifarma", logo: "/images/partners/purifarma-logo.avif" },
  // Add more partners here if needed, e.g.:
  // { name: "Partner 4", logo: "/placeholder.svg?width=120&height=60&text=Parceiro+D" },
  // { name: "Partner 5", logo: "/placeholder.svg?width=120&height=60&text=Parceiro+E" },
];

const WHATSAPP_NUMBER = "5541996949516"; // Store number without special chars for the link
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Olá! Gostaria de mais informações.`;

export default function Footer({ dictionary, lang }: { dictionary: Dictionary; lang: string }) {
  const currentYear = new Date().getFullYear();
  const navLinks = [
    { href: "/#about", label: dictionary.nav_about },
    { href: `/${lang}/mission`, label: dictionary.nav_pharmacy },
    { href: "/#services", label: dictionary.nav_services },
    { href: "/#professionals", label: dictionary.nav_professionals },
    { href: "/#contact", label: dictionary.nav_contact },
  ];
  const socialLinks = [
    { href: "#", icon: <Twitter size={20} />, label: "Twitter" },
    { href: "#", icon: <Facebook size={20} />, label: "Facebook" },
    { href: "#", icon: <Instagram size={20} />, label: "Instagram" },
    { href: "#", icon: <Linkedin size={20} />, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Coluna da Logo e Descrição */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="inline-block mb-6">
              <Image
                src="/images/logo-cosmetica.avif"
                alt="Cosmética Logo"
                width={200}
                height={55}
                className="object-contain filter brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              {/* This text should also be in dictionary if it needs translation */}
              Inovação e cuidado personalizado em cada fórmula. Saúde e bem-estar com a tradição da manipulação magistral e a mais alta tecnologia.
            </p>
          </div>

          {/* Coluna de Navegação */}
          <div>
            <h4 className="font-semibold text-lg text-white mb-5">{dictionary.quick_nav}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de Contato */}
          <div>
            <h4 className="font-semibold text-lg text-white mb-5">{dictionary.contact_us}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">{dictionary.address_label}:</span>
                  <br />
                  R. Dep. Antônio Baby, 87
                  <br />
                  CEP 80240-370 | Batel - Curitiba - PR, Brasil
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium">{dictionary.phone_label}:</span>{" "}
                  <a href="tel:+554133437318" className="hover:text-primary">
                    (41) 3343-7318
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium">{dictionary.whatsapp_label}:</span>{" "}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    (41) 99694-9516
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <div>
                  <span className="font-medium">{dictionary.email_label}:</span>{" "}
                  <a href="mailto:cosmetica@cosmetica.far.br" className="hover:text-primary">
                    cosmetica@cosmetica.far.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 mt-3">
                <Clock size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">{dictionary.opening_hours_label}:</span>
                  <br />
                  {dictionary.weekdays}: 08:00 às 19:00
                  <br />
                  {dictionary.saturdays}: 08:00 às 13:00
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna de Redes Sociais */}
          <div>
            <h4 className="font-semibold text-lg text-white mb-5">{dictionary.follow_us}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-primary transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-primary/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Seção de Parceiros */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <h4 className="font-semibold text-lg text-white mb-6 text-center">{dictionary.partners_title}</h4>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {partners.map((partner, index) => (
              <div key={index} className="opacity-80 hover:opacity-100 transition-opacity duration-300" title={partner.name}>
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120} // Adjusted size for better visibility
                  height={60}
                  className="object-contain filter brightness-30" // Making logos white for dark bg
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Informações Regulatórias */}
        <div className="border-t border-b border-gray-700 my-8 py-8 text-gray-400 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h5 className="font-semibold text-gray-200 mb-2">{dictionary.company_info}</h5>
              <p>Cosmética Farmácia de Manipulação LTDA</p>
              <p>CNPJ: 04.145.747/0001-99</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-200 mb-2">{dictionary.technical_responsibility}</h5>
              <p>Maite Chiodini</p>
              <p>CRF 11.029 PR</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-200 mb-2">{dictionary.licenses_authorizations}</h5>
              <p>Licença Sanitária: Processo nº 20316/16</p>
              <p>AFE: AUTORIZ/MS 135435.6 (D.O.U. 25/08/2014)</p>
              <p>AE: AUTORIZ/MS 1.35435.6 (D.O.U. 25/08/2014)</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Cosmética Farmácia de Manipulação. {dictionary.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
