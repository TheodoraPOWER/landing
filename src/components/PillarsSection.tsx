import React, { useRef, useEffect } from 'react';
import { Eye, Brain, ShieldCheck } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface PillarsSectionProps {
  onOpenContactForm: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onOpenContactForm }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isVisible) {
      const elements = [headingRef.current, pillarsRef.current];
      elements.forEach((el, index) => {
        if (el) {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 300);
        }
      });
    }
  }, [isVisible]);

  const pillarsData = [
    {
      id: 1,
      icon: <Eye className="h-8 w-8" />,
      titleKey: "pillars.pillar1.title",
      descriptionKey: "pillars.pillar1.description",
      featureKeys: [
        "pillars.pillar1.feature1",
        "pillars.pillar1.feature2",
        "pillars.pillar1.feature3",
        "pillars.pillar1.feature4"
      ]
    },
    {
      id: 2,
      icon: <Brain className="h-8 w-8" />,
      titleKey: "pillars.pillar2.title",
      descriptionKey: "pillars.pillar2.description",
      featureKeys: [
        "pillars.pillar2.feature1",
        "pillars.pillar2.feature2",
        "pillars.pillar2.feature3",
        "pillars.pillar2.feature4"
      ]
    },
    {
      id: 3,
      icon: <ShieldCheck className="h-8 w-8" />,
      titleKey: "pillars.pillar3.title",
      descriptionKey: "pillars.pillar3.description",
      featureKeys: [
        "pillars.pillar3.feature1",
        "pillars.pillar3.feature2",
        "pillars.pillar3.feature3",
        "pillars.pillar3.feature4"
      ]
    }
  ];

  return (
    <section 
      id="how-it-works"
      ref={sectionRef}
      className="section bg-bg-secondary relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-tr-full"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="fade-in mb-6"
          >
            {t('pillars.headline1')} <span className="text-accent">{t('pillars.headline2')}</span>
          </h2>
          <p className="fade-in text-xl text-secondary">
            {t('pillars.subheadline')}
          </p>
        </div>
        
        <div 
          ref={pillarsRef}
          className="fade-in"
        >
          {pillarsData.map((pillar, index) => (
            <div 
              key={pillar.id} 
              className={`flex flex-col lg:flex-row gap-8 items-center mb-16 lg:mb-24 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:w-1/2">
                <div className={`
                  p-8 rounded-lg 
                  ${index % 2 === 0 ? 'bg-white' : 'bg-primary text-white'}
                  shadow-lg
                `}>
                  <div className={`
                    inline-flex p-4 rounded-full mb-6
                    ${index % 2 === 0 ? 'bg-bg-secondary text-accent' : 'bg-accent/20 text-white'}
                  `}>
                    {pillar.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{t(pillar.titleKey)}</h3>
                  <p className={`
                    text-lg mb-8
                    ${index % 2 === 0 ? 'text-secondary' : 'text-white/80'}
                  `}>
                    {t(pillar.descriptionKey)}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pillar.featureKeys.map((featureKey, i) => (
                      <div 
                        key={i} 
                        className={`
                          flex items-center gap-3 p-3 rounded
                          ${index % 2 === 0 ? 'bg-bg-secondary' : 'bg-white/10'}
                        `}
                      >
                        <div className={`
                          h-2 w-2 rounded-full shrink-0
                          ${index % 2 === 0 ? 'bg-accent' : 'bg-accent'}
                        `}></div>
                        <span className="text-sm font-medium">{t(featureKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className={`
                  aspect-square max-w-md mx-auto relative
                  ${index % 2 === 1 ? 'lg:pr-12' : 'lg:pl-12'}
                `}>
                  {/* Visual representation of each pillar */}
                  {index === 0 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full h-full">
                        {/* Observability visualization */}
                        <div className="absolute inset-0 bg-bg-secondary rounded-lg"></div>
                        
                        <div className="absolute top-1/4 left-1/4 h-4 w-4 bg-steel rounded-full"></div>
                        <div className="absolute top-1/3 right-1/3 h-6 w-6 bg-steel rounded-full"></div>
                        <div className="absolute bottom-1/4 left-1/3 h-5 w-5 bg-steel rounded-full"></div>
                        <div className="absolute bottom-1/3 right-1/4 h-3 w-3 bg-steel rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-accent rounded-full"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-1/2 w-1/2 border-2 border-accent rounded-full opacity-30 animate-pulse"></div>
                        </div>
                        
                        <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100">
                          <line x1="25" y1="25" x2="50" y2="50" stroke="#6C7A89" strokeWidth="1" />
                          <line x1="66" y1="33" x2="50" y2="50" stroke="#6C7A89" strokeWidth="1" />
                          <line x1="33" y1="75" x2="50" y2="50" stroke="#6C7A89" strokeWidth="1" />
                          <line x1="75" y1="66" x2="50" y2="50" stroke="#6C7A89" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full h-full">
                        {/* AI visualization */}
                        <div className="absolute inset-0 bg-primary rounded-lg"></div>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                          <div className="w-full grid grid-cols-4 gap-2 mb-4">
                            {Array.from({length: 12}).map((_, i) => (
                              <div 
                                key={i} 
                                className="h-2 bg-white/30 rounded-full" 
                                style={{
                                  opacity: 0.1 + Math.random() * 0.4,
                                  width: `${50 + Math.random() * 50}%`
                                }}
                              ></div>
                            ))}
                          </div>
                          
                          <div className="w-full h-16 mb-6 relative">
                            {/* Graph line */}
                            <svg className="absolute inset-0" viewBox="0 0 100 40">
                              <path 
                                d="M0,30 Q20,28 25,25 T40,20 T60,15 T75,10 T100,5" 
                                fill="none" 
                                stroke="#00A99D" 
                                strokeWidth="2"
                              />
                            </svg>
                            
                            {/* Anomaly point */}
                            <div className="absolute top-1/4 right-1/4 h-3 w-3 bg-accent rounded-full animate-pulse-slow"></div>
                          </div>
                          
                          <div className="w-full grid grid-cols-3 gap-3">
                            <div className="h-8 bg-white/10 rounded flex items-center justify-center">
                              <div className="h-2 w-1/2 bg-accent/40 rounded-full"></div>
                            </div>
                            <div className="h-8 bg-accent rounded flex items-center justify-center">
                              <div className="h-2 w-1/2 bg-white/40 rounded-full"></div>
                            </div>
                            <div className="h-8 bg-white/10 rounded flex items-center justify-center">
                              <div className="h-2 w-1/2 bg-accent/40 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full h-full">
                        {/* Compliance visualization */}
                        <div className="absolute inset-0 bg-white rounded-lg border border-border"></div>
                        
                        <div className="absolute top-8 left-8 right-8 h-12 flex items-center">
                          <div className="h-full aspect-square bg-accent rounded-l flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 h-full bg-bg-secondary rounded-r flex items-center px-4">
                            <div className="h-2 w-32 bg-steel/30 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="absolute top-24 left-8 right-8 bottom-8 bg-bg-secondary rounded p-4 flex flex-col">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="h-2 w-20 bg-steel/30 rounded-full"></div>
                            <div className="h-6 w-24 rounded bg-accent flex items-center justify-center">
                              <div className="h-2 w-12 bg-white/40 rounded-full"></div>
                            </div>
                          </div>
                          
                          {Array.from({length: 3}).map((_, i) => (
                            <div 
                              key={i}
                              className="mb-3 p-3 bg-white rounded flex items-center gap-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-accent"></div>
                              </div>
                              <div className="flex-1">
                                <div className="h-2 w-20 bg-steel/30 rounded-full mb-2"></div>
                                <div className="h-2 w-full bg-steel/10 rounded-full"></div>
                              </div>
                              <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button onClick={onOpenContactForm} className="btn btn-primary">
            {t('pillars.cta.chat')}
          </button>
        </div>
      </div>
    </section>
  );
};