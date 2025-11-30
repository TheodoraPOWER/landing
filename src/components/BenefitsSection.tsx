import React, { useRef, useEffect, useState, useMemo } from 'react';
import { TrendingDown, Clock, ShieldCheck, LineChart, Zap } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface BenefitsSectionProps {
  onOpenContactForm: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenContactForm }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  const [counters, setCounters] = useState({
    incidentDetection: 0,
    complianceAutomation: 0,
    infrastructureResilience: 0,
    riskReduction: 0,
    fasterResolution: 0
  });

  // Memoize the targetValues object
  const targetValues = useMemo(() => ({
    incidentDetection: 82,
    complianceAutomation: 90,
    infrastructureResilience: 99.7,
    riskReduction: 75,
    fasterResolution: 60
  }), []); // Empty dependency array means it's created only once
  
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
      
      // Animate counters
      const duration = 2000; // 2 seconds
      const steps = 30;
      const increment = {
        incidentDetection: targetValues.incidentDetection / steps,
        complianceAutomation: targetValues.complianceAutomation / steps,
        infrastructureResilience: targetValues.infrastructureResilience / steps,
        riskReduction: targetValues.riskReduction / steps,
        fasterResolution: targetValues.fasterResolution / steps
      };

      let step = 0;
      const timer = setInterval(() => {
        if (step >= steps) {
          setCounters(targetValues);
          clearInterval(timer);
          return;
        }

        setCounters(prev => ({
          incidentDetection: Math.min(Math.round(prev.incidentDetection + increment.incidentDetection), targetValues.incidentDetection),
          complianceAutomation: Math.min(Math.round(prev.complianceAutomation + increment.complianceAutomation), targetValues.complianceAutomation),
          infrastructureResilience: Math.min(Number((prev.infrastructureResilience + increment.infrastructureResilience).toFixed(1)), targetValues.infrastructureResilience),
          riskReduction: Math.min(Math.round(prev.riskReduction + increment.riskReduction), targetValues.riskReduction),
          fasterResolution: Math.min(Math.round(prev.fasterResolution + increment.fasterResolution), targetValues.fasterResolution)
        }));

        step++;
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, targetValues]);

  return (
    <section 
      id="benefits"
      ref={sectionRef}
      className="section bg-white"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="fade-in mb-6"
          >
            {t('benefits.headline1')} <span className="text-accent">{t('benefits.headline2')}</span>
          </h2>
          <p className="fade-in text-xl text-secondary">
            {t('benefits.subheadline')}
          </p>
        </div>
        
        <div
          ref={statsRef}
          className="fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <div className="bg-bg-secondary p-8 rounded-lg text-center">
            <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-6">
              <Zap className="h-8 w-8" />
            </div>
            <div className="text-5xl font-bold mb-2 flex items-end justify-center">
              <span>{counters.incidentDetection}</span>
              <span className="text-accent text-3xl">%</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('benefits.stat1.title')}</h3>
            <p className="text-secondary text-sm">
              {t('benefits.stat1.description')}
            </p>
          </div>

          <div className="bg-bg-secondary p-8 rounded-lg text-center">
            <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-6">
              <Clock className="h-8 w-8" />
            </div>
            <div className="text-5xl font-bold mb-2 flex items-end justify-center">
              <span>{counters.complianceAutomation}</span>
              <span className="text-accent text-3xl">%</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('benefits.stat2.title')}</h3>
            <p className="text-secondary text-sm">
              {t('benefits.stat2.description')}
            </p>
          </div>

          <div className="bg-bg-secondary p-8 rounded-lg text-center">
            <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div className="text-5xl font-bold mb-2 flex items-end justify-center">
              <span>{counters.infrastructureResilience}</span>
              <span className="text-accent text-3xl">%</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('benefits.stat3.title')}</h3>
            <p className="text-secondary text-sm">
              {t('benefits.stat3.description')}
            </p>
          </div>

          <div className="bg-bg-secondary p-8 rounded-lg text-center">
            <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-6">
              <TrendingDown className="h-8 w-8" />
            </div>
            <div className="text-5xl font-bold mb-2 flex items-end justify-center">
              <span>{counters.riskReduction}</span>
              <span className="text-accent text-3xl">%</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('benefits.stat4.title')}</h3>
            <p className="text-secondary text-sm">
              {t('benefits.stat4.description')}
            </p>
          </div>

          <div className="bg-bg-secondary p-8 rounded-lg text-center">
            <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-6">
              <LineChart className="h-8 w-8" />
            </div>
            <div className="text-5xl font-bold mb-2 flex items-end justify-center">
              <span>{counters.fasterResolution}</span>
              <span className="text-accent text-3xl">%</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('benefits.stat5.title')}</h3>
            <p className="text-secondary text-sm">
              {t('benefits.stat5.description')}
            </p>
          </div>
        </div>
        
        <div className="mt-20 bg-white border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-6">{t('benefits.realResults.title')}</h3>
              <p className="text-secondary mb-8">
                {t('benefits.realResults.description')}
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-bg-secondary text-accent flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t('benefits.realResults.case1.title')}</h4>
                    <p className="text-secondary">
                      {t('benefits.realResults.case1.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-bg-secondary text-accent flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t('benefits.realResults.case2.title')}</h4>
                    <p className="text-secondary">
                      {t('benefits.realResults.case2.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-bg-secondary text-accent flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t('benefits.realResults.case3.title')}</h4>
                    <p className="text-secondary">
                      {t('benefits.realResults.case3.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <button onClick={onOpenContactForm} className="btn btn-primary mt-8">
                {t('benefits.cta.chat')}
              </button>
            </div>
            
            <div className="bg-bg-secondary p-8 lg:p-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md mx-auto p-6">
                {/* Testimonial Placeholder */}
                <div className="bg-white rounded-lg p-8 shadow relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-steel/20"></div>
                    <div>
                      <div className="h-4 w-32 bg-steel/20 rounded mb-1"></div>
                      <div className="h-3 w-24 bg-steel/10 rounded"></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="h-3 w-full bg-steel/10 rounded mb-2"></div>
                    <div className="h-3 w-full bg-steel/10 rounded mb-2"></div>
                    <div className="h-3 w-2/3 bg-steel/10 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 h-24 w-24 bg-accent/10 rounded-full -z-0"></div>
                <div className="absolute bottom-0 left-0 h-16 w-16 bg-accent/20 rounded-full -z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};