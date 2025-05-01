import React, { useEffect, useRef } from 'react';
import { Shield, TrendingUp, EyeIcon } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  onOpenContactForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContactForm }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subHeadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isVisible) {
      const elements = [headlineRef.current, subHeadlineRef.current, ctaRef.current];
      elements.forEach((el, index) => {
        if (el) {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 200);
        }
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-white flex items-center pt-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-bg-secondary opacity-50 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-bg-secondary opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={headlineRef} 
            className="fade-in mb-6 font-bold tracking-tight"
          >
            <span className="text-primary">{t('hero.headline1')}</span>
            <br />
            <span className="text-accent">{t('hero.headline2')}</span>
          </h1>
          
          <p 
            ref={subHeadlineRef}
            className="fade-in text-xl md:text-2xl text-secondary mb-10 max-w-3xl mx-auto"
          >
            {t('hero.subheadline')}
          </p>
          
          <div 
            ref={ctaRef}
            className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={onOpenContactForm} className="btn btn-primary w-full sm:w-auto">
              {t('hero.cta.chat')}
            </button>
            <button className="btn btn-secondary w-full sm:w-auto">
              {t('hero.cta.learnMore')}
            </button>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-border rounded-lg shadow-sm transition-all hover:shadow-md fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-bg-secondary text-accent">
                <EyeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t('hero.feature1.title')}</h3>
            </div>
            <p className="text-secondary">{t('hero.feature1.description')}</p>
          </div>
          
          <div className="p-6 bg-white border border-border rounded-lg shadow-sm transition-all hover:shadow-md fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-bg-secondary text-accent">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t('hero.feature2.title')}</h3>
            </div>
            <p className="text-secondary">{t('hero.feature2.description')}</p>
          </div>
          
          <div className="p-6 bg-white border border-border rounded-lg shadow-sm transition-all hover:shadow-md fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-bg-secondary text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t('hero.feature3.title')}</h3>
            </div>
            <p className="text-secondary">{t('hero.feature3.description')}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in visible animate-bounce">
        <a href="#problem" className="text-secondary hover:text-accent transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};