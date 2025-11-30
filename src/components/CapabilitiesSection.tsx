import React, { useRef, useEffect } from 'react';
import { Shield, AlertCircle, TestTube, Network, Share2 } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

interface CapabilitiesSectionProps {
  onOpenContactForm: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenContactForm }) => {
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

  const capabilities = [
    {
      id: 1,
      icon: <Shield className="h-6 w-6" />,
      titleKey: 'capabilities.capability1.title',
      features: ['feature1', 'feature2', 'feature3', 'feature4']
    },
    {
      id: 2,
      icon: <AlertCircle className="h-6 w-6" />,
      titleKey: 'capabilities.capability2.title',
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6']
    },
    {
      id: 3,
      icon: <TestTube className="h-6 w-6" />,
      titleKey: 'capabilities.capability3.title',
      features: ['feature1', 'feature2', 'feature3', 'feature4']
    },
    {
      id: 4,
      icon: <Network className="h-6 w-6" />,
      titleKey: 'capabilities.capability4.title',
      features: ['feature1', 'feature2', 'feature3', 'feature4']
    },
    {
      id: 5,
      icon: <Share2 className="h-6 w-6" />,
      titleKey: 'capabilities.capability5.title',
      features: ['feature1', 'feature2', 'feature3', 'feature4']
    }
  ];

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="section bg-white"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2
            ref={headingRef}
            className="fade-in mb-6"
          >
            {t('capabilities.headline1')} <span className="text-accent">{t('capabilities.headline2')}</span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              className="bg-bg-secondary p-6 rounded-lg border border-border transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  {capability.icon}
                </div>
                <h3 className="text-lg font-bold">{t(capability.titleKey)}</h3>
              </div>
              <ul className="space-y-2">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                    <span className="text-sm text-secondary">
                      {t(`capabilities.capability${capability.id}.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={onOpenContactForm} className="btn btn-primary">
            {t('capabilities.cta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};
