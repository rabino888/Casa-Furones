
import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../TranslationContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold serif mb-4">Casa Rural Furones</h3>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/casarural.furones/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61578333865894" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-[#8C7B65] shrink-0" size={20} />
                <span>Villanueva de Algaidas, Málaga, España, 29310</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-[#8C7B65] shrink-0" size={20} />
                <span>{t('contact_phone')}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-[#8C7B65] shrink-0" size={20} />
                <span className="break-all">{t('contact_email')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer_nav')}</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{t('nav_home')}</a></li>
              <li><a href="#/guia-insider" className="text-gray-400 hover:text-white transition-colors">{t('nav_guide')}</a></li>
              <li><a href="#/reservar" className="text-gray-400 hover:text-white transition-colors">{t('nav_book')}</a></li>
              <li><a href="#/privacidad" className="text-gray-400 hover:text-white transition-colors">{t('footer_privacy')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Casa Rural Furones. Todos los derechos reservados.</p>
          <p>Diseño Web: <span className="text-[#8C7B65]">Rustic Luxury Digital</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
