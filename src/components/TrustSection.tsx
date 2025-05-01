import React, { useRef, useEffect } from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface TrustSectionProps {
  onOpenContactForm: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onOpenContactForm }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isVisible) {
      const elements = [headingRef.current, contentRef.current];
      elements.forEach((el, index) => {
        if (el) {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 300);
        }
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="section bg-primary text-white"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="fade-in mb-6"
          >
            {t('trust.headline1')} <span className="text-accent">{t('trust.headline2')}</span>
          </h2>
          <p className="fade-in text-xl text-white/80">
            {t('trust.subheadline')}
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className="fade-in grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="inline-flex p-4 rounded-full bg-accent/20 text-accent mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('trust.feature1.title')}</h3>
            <p className="text-white/80 mb-6">
              {t('trust.feature1.description')}
            </p>
            <ul className="space-y-3">
              {[
                t('trust.feature1.item1'), 
                t('trust.feature1.item2'), 
                t('trust.feature1.item3')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="inline-flex p-4 rounded-full bg-accent/20 text-accent mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('trust.feature2.title')}</h3>
            <p className="text-white/80 mb-6">
              {t('trust.feature2.description')}
            </p>
            <ul className="space-y-3">
              {[
                t('trust.feature2.item1'), 
                t('trust.feature2.item2'), 
                t('trust.feature2.item3')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="inline-flex p-4 rounded-full bg-accent/20 text-accent mb-6">
              <svg className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{t('trust.feature3.title')}</h3>
            <p className="text-white/80 mb-6">
              {t('trust.feature3.description')}
            </p>
            <ul className="space-y-3">
              {[
                t('trust.feature3.item1'), 
                t('trust.feature3.item2'), 
                t('trust.feature3.item3')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 p-8 bg-white/5 rounded-lg backdrop-blur-sm">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">{t('trust.cta.title')}</h3>
            <p className="text-white/80">
              {t('trust.cta.description')}
            </p>
          </div>
          <button onClick={onOpenContactForm} className="btn btn-primary whitespace-nowrap">
            {t('trust.cta.button')}
          </button>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">{t('trust.trustedBy')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-12 w-32 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};