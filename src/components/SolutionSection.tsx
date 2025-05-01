import React, { useRef, useEffect } from 'react';
import { Shield, Activity, Database } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface SolutionSectionProps {
  onOpenContactForm: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenContactForm }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isVisible) {
      const elements = [headingRef.current, contentRef.current, imageRef.current];
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
      id="solution"
      ref={sectionRef}
      className="section bg-white"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="fade-in mb-6"
          >
            {t('solution.headline1')} <span className="text-accent">{t('solution.headline2')}</span>
          </h2>
          <p className="fade-in text-xl text-secondary">
            {t('solution.subheadline')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={contentRef}
            className="fade-in space-y-8"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-bg-secondary text-accent shrink-0">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{t('solution.feature1.title')}</h3>
                <p className="text-secondary">
                  {t('solution.feature1.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-bg-secondary text-accent shrink-0">
                <Activity className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{t('solution.feature2.title')}</h3>
                <p className="text-secondary">
                  {t('solution.feature2.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-bg-secondary text-accent shrink-0">
                <Database className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{t('solution.feature3.title')}</h3>
                <p className="text-secondary">
                  {t('solution.feature3.description')}
                </p>
              </div>
            </div>
            
            <button onClick={onOpenContactForm} className="btn btn-primary">
              {t('solution.cta.chat')}
            </button>
          </div>
          
          <div 
            ref={imageRef}
            className="fade-in relative"
          >
            <div className="bg-bg-secondary p-6 rounded-lg shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-white rounded overflow-hidden border border-border">
                {/* Platform Interface Mockup - Internacionalizado */}
                <div className="absolute inset-0 p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent"></div>
                      <div className="h-2 w-24 bg-bg-secondary rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-bg-secondary rounded"></div>
                      <div className="h-8 w-8 rounded-full bg-bg-secondary"></div>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-4">
                    <div className="h-8 w-28 bg-accent rounded text-white flex items-center justify-center text-xs">{t('solution.mockup.tab1')}</div>
                    <div className="h-8 w-28 bg-bg-secondary rounded flex items-center justify-center text-xs">{t('solution.mockup.tab2')}</div>
                    <div className="h-8 w-28 bg-bg-secondary rounded flex items-center justify-center text-xs">{t('solution.mockup.tab3')}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-bg-secondary p-3 rounded">
                      <div className="h-2 w-12 bg-steel/30 rounded mb-2"></div>
                      <div className="text-lg font-bold text-accent">97.3%</div>
                      <div className="h-2 w-full bg-steel/20 rounded mt-2"></div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded">
                      <div className="h-2 w-12 bg-steel/30 rounded mb-2"></div>
                      <div className="text-lg font-bold text-primary">24</div>
                      <div className="h-2 w-full bg-steel/20 rounded mt-2"></div>
                    </div>
                    <div className="bg-bg-secondary p-3 rounded">
                      <div className="h-2 w-12 bg-steel/30 rounded mb-2"></div>
                      <div className="text-lg font-bold text-primary">$1.2M</div>
                      <div className="h-2 w-full bg-steel/20 rounded mt-2"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-bg-secondary rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-2 w-20 bg-steel/30 rounded"></div>
                      <div className="h-2 w-12 bg-steel/30 rounded"></div>
                    </div>
                    <div className="h-20 w-full bg-white/80 rounded-sm mb-2 p-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-accent"></div>
                        <div className="h-2 w-24 bg-steel/20 rounded"></div>
                      </div>
                      <div className="mt-2 h-2 w-full bg-steel/10 rounded"></div>
                      <div className="mt-1 h-2 w-full bg-steel/10 rounded"></div>
                    </div>
                    <div className="h-20 w-full bg-white/80 rounded-sm p-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-steel"></div>
                        <div className="h-2 w-20 bg-steel/20 rounded"></div>
                      </div>
                      <div className="mt-2 h-2 w-full bg-steel/10 rounded"></div>
                      <div className="mt-1 h-2 w-full bg-steel/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-secondary">
                <span>{t('solution.mockup.footer1')}</span>
                <span className="text-accent">{t('solution.mockup.footer2')}</span>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 h-12 w-12 rounded bg-accent/20 -z-10"></div>
            <div className="absolute -bottom-8 -left-8 h-16 w-16 rounded bg-accent/10 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};