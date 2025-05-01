import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  const effectiveDate = '[Fecha de Entrada en Vigor]';
  const websiteUrl = '[TuSitioWeb.com]';
  const contactEmail = '[Su Correo Electrónico de Contacto]';
  const jurisdiction = '[Su Jurisdicción]';
  const cityJurisdiction = '[Su Ciudad/Estado de Jurisdicción]';

  return (
    <div className="container-custom py-16 pt-32 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{t('terms.title')}</h1>
      <p className="mb-4">{t('terms.effectiveDateLabel')} {effectiveDate}</p>

      <div className="space-y-6 text-secondary">
        <p className="font-semibold">
          {t('terms.paragraph1')}
        </p>
        <p>
          {t('terms.paragraph2', { websiteUrl })}
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section1.title')}</h2>
          <p>
            {t('terms.section1.paragraph1', { websiteUrl })}
          </p>
          <p>
            {t('terms.section1.paragraph2')}
          </p>
          <p>
            {t('terms.section1.paragraph3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section2.title')}</h2>
          <p>{t('terms.section2.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section3.title')}</h2>
          <p className="mb-4">{t('terms.section3.paragraph1')}</p>
          <p>{t('terms.section3.paragraph2')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section4.title')}</h2>
          <p className="mb-4">{t('terms.section4.intro')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('terms.section4.item1')}</li>
            <li>{t('terms.section4.item2')}</li>
            <li>{t('terms.section4.item3')}</li>
            <li>{t('terms.section4.item4')}</li>
            <li>{t('terms.section4.item5')}</li>
            <li>{t('terms.section4.item6')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section5.title')}</h2>
          <p className="mb-4">{t('terms.section5.intro')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('terms.section5.item1')}</li>
            <li>{t('terms.section5.item2')}</li>
            <li>{t('terms.section5.item3')}</li>
            <li>{t('terms.section5.item4')}</li>
            <li>{t('terms.section5.item5')}</li>
            <li>{t('terms.section5.item6')}</li>
            <li>{t('terms.section5.item7')}</li>
            <li>{t('terms.section5.item8')}</li>
            <li>{t('terms.section5.item9')}</li>
            <li>{t('terms.section5.item10')}</li>
            <li>{t('terms.section5.item11')}</li>
            <li>{t('terms.section5.item12')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section6.title')}</h2>
          <p>{t('terms.section6.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section7.title')}</h2>
          <p>{t('terms.section7.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section8.title')}</h2>
          <p className="mb-4">{t('terms.section8.paragraph1')}</p>
          <p>{t('terms.section8.paragraph2')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section9.title')}</h2>
          <p>{t('terms.section9.paragraph1', { jurisdiction })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section10.title')}</h2>
          <p>{t('terms.section10.paragraph1', { cityJurisdiction, jurisdiction })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section11.title')}</h2>
          <p className="uppercase">{t('terms.section11.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section12.title')}</h2>
          <p className="uppercase">{t('terms.section12.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section13.title')}</h2>
          <p>{t('terms.section13.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms.section14.title')}</h2>
          <p className="mb-4">{t('terms.section14.intro')}</p>
          <address className="not-italic">
            {t('terms.section14.address.line1')}
            <br />
            {t('terms.section14.address.email', { contactEmail })}
          </address>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 