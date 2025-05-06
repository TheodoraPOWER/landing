import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import footerLogoSrc from '../assets/logo.avif';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={footerLogoSrc}
                alt={t('footer.logoAlt', { defaultValue: 'Theodora Logo' })}
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold">Theodora</span>
            </div>
            <p className="text-white/70 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {[
                { key: 'twitter', name: t('footer.social.twitter') },
                { key: 'linkedin', name: t('footer.social.linkedin') },
                { key: 'facebook', name: t('footer.social.facebook') }
              ].map((platform) => (
                <a 
                  key={platform.key}
                  href="#" 
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors"
                  aria-label={platform.name}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    {platform.key === 'twitter' && <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.94 14.64 20.94 9.21c0-.21 0-.42-.01-.62.84-.6 1.56-1.36 2.14-2.23z"/>}
                    {platform.key === 'linkedin' && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>}
                    {platform.key === 'facebook' && <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.contact.title')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/70">
                  {t('footer.contact.email')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/70">
                  {t('footer.contact.phone')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/70 whitespace-pre-line">
                  {t('footer.contact.address')}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-white/50 text-sm hover:text-accent transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="text-white/50 text-sm hover:text-accent transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/cookies-policy" className="text-white/50 text-sm hover:text-accent transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};