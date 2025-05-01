import React, { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface FinalCTAProps {
  onOpenContactForm: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenContactForm }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isVisible && contentRef.current) {
      contentRef.current.classList.add('visible');
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-bg-secondary opacity-50 skew-y-6 transform -translate-y-1/2"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={contentRef}
          className="fade-in max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            {t('finalCta.headline1')}<br />
            <span className="text-accent">{t('finalCta.headline2')}</span>
          </h2>
          <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
            {t('finalCta.subheadline')}
          </p>
          <button onClick={onOpenContactForm} className="btn btn-primary text-xl px-10 py-5">
            {t('finalCta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};