import React, { useRef, useEffect } from 'react';
import { AlertTriangle, Ban, DollarSign, Search } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

export const ProblemSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isVisible) {
      const elements = [headingRef.current, statsRef.current];
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
      id="problem"
      ref={sectionRef}
      className="section bg-bg-secondary"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="fade-in mb-6"
          >
            {t('problem.headline1')} <span className="text-accent">{t('problem.headline2')}</span>
          </h2>
          <p className="fade-in text-xl text-secondary">
            {t('problem.subheadline')}
          </p>
        </div>
        
        <div 
          ref={statsRef}
          className="fade-in grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-full bg-bg-secondary text-accent shrink-0">
                <DollarSign className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t('problem.stat1.title')}</h3>
                <p className="text-secondary mb-6">
                  {t('problem.stat1.description')}
                </p>
                <div className="text-5xl font-bold text-primary">
                  {t('problem.stat1.value')}<span className="text-accent">{t('problem.stat1.valueSuffix')}</span>
                  <p className="text-sm font-normal text-secondary mt-2">{t('problem.stat1.label')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-full bg-bg-secondary text-accent shrink-0">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t('problem.stat2.title')}</h3>
                <p className="text-secondary mb-6">
                  {t('problem.stat2.description')}
                </p>
                <div className="text-5xl font-bold text-primary">
                  {t('problem.stat2.value')}<span className="text-accent">{t('problem.stat2.valueSuffix')}</span>
                  <p className="text-sm font-normal text-secondary mt-2">{t('problem.stat2.label')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-full bg-bg-secondary text-accent shrink-0">
                <Ban className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t('problem.stat3.title')}</h3>
                <p className="text-secondary mb-6">
                  {t('problem.stat3.description')}
                </p>
                <div className="text-5xl font-bold text-primary">
                  {t('problem.stat3.value')}<span className="text-accent">{t('problem.stat3.valueSuffix')}</span>
                  <p className="text-sm font-normal text-secondary mt-2">{t('problem.stat3.label')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-full bg-bg-secondary text-accent shrink-0">
                <Search className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t('problem.stat4.title')}</h3>
                <p className="text-secondary mb-6">
                  {t('problem.stat4.description')}
                </p>
                <div className="text-5xl font-bold text-primary">
                  {t('problem.stat4.value')}<span className="text-accent">{t('problem.stat4.valueSuffix')}</span>
                  <p className="text-sm font-normal text-secondary mt-2">{t('problem.stat4.label')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};