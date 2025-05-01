import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  const effectiveDate = '[Fecha de Entrada en Vigor]';
  const websiteUrl = '[TuSitioWeb.com]';
  const contactAddress = '[Su Dirección Física]';
  const contactEmail = '[Su Correo Electrónico de Contacto]';
  const contactPhone = '[Su Número de Teléfono de Contacto]';

  return (
    <div className="container-custom py-16 pt-32 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{t('privacy.title')}</h1>
      <p className="text-sm text-gray-600 mb-4">{t('privacy.effectiveDateLabel')} {effectiveDate}</p>

      <div className="space-y-6 text-secondary">
        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section1.title')}</h2>
          <p>{t('privacy.section1.paragraph1', { websiteUrl })}</p>
          <p className="mt-2">{t('privacy.section1.paragraph2')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section2.title')}</h2>
          <p>{t('privacy.section2.intro')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>{t('privacy.section2.item1.title')}</strong>
              <p className="ml-4">{t('privacy.section2.item1.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section2.item2.title')}</strong>
              <p className="ml-4">{t('privacy.section2.item2.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section2.item3.title')}</strong>
              <p className="ml-4">{t('privacy.section2.item3.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section2.item4.title')}</strong>
              <p className="ml-4">{t('privacy.section2.item4.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section2.item5.title')}</strong>
              <p className="ml-4">{t('privacy.section2.item5.description')}</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section3.title')}</h2>
          <p>{t('privacy.section3.intro')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>{t('privacy.section3.item1')}</li>
            <li>{t('privacy.section3.item2')}</li>
            <li>{t('privacy.section3.item3')}</li>
            <li>{t('privacy.section3.item4')}</li>
            <li>{t('privacy.section3.item5')}</li>
            <li>{t('privacy.section3.item6')}</li>
            <li>{t('privacy.section3.item7')}</li>
            <li>{t('privacy.section3.item8')}</li>
            <li>{t('privacy.section3.item9')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section4.title')}</h2>
          <p>{t('privacy.section4.intro')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>{t('privacy.section4.item1.title')}</strong>
              <p className="ml-4">{t('privacy.section4.item1.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section4.item2.title')}</strong>
              <p className="ml-4">{t('privacy.section4.item2.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section4.item3.title')}</strong>
              <p className="ml-4">{t('privacy.section4.item3.description')}</p>
            </li>
            <li>
              <strong>{t('privacy.section4.item4.title')}</strong>
              <p className="ml-4">{t('privacy.section4.item4.description')}</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section5.title')}</h2>
          <p>{t('privacy.section5.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section6.title')}</h2>
          <p>{t('privacy.section6.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section7.title')}</h2>
          <p className="mb-4">{t('privacy.section7.intro')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('privacy.section7.item1')}</li>
            <li>{t('privacy.section7.item2')}</li>
            <li>{t('privacy.section7.item3')}</li>
            <li>{t('privacy.section7.item4')}</li>
            <li>{t('privacy.section7.item5')}</li>
            <li>{t('privacy.section7.item6')}</li>
          </ul>
          <p className="mt-4">{t('privacy.section7.outro')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section8.title')}</h2>
          <p>{t('privacy.section8.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section9.title')}</h2>
          <p>{t('privacy.section9.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('privacy.section10.title')}</h2>
          <p>{t('privacy.section10.intro')}</p>
          <address className="mt-2 not-italic">
            {t('privacy.section10.address.line1')}
            <br />
            {t('privacy.section10.address.line2', { contactAddress })}
            <br />
            {t('privacy.section10.address.email', { contactEmail })}
            <br />
            {t('privacy.section10.address.phone', { contactPhone })}
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 