import React from 'react';
import { useTranslation } from 'react-i18next';

const CookiesPolicy: React.FC = () => {
  const { t } = useTranslation();

  const effectiveDate = '[Fecha de Entrada en Vigor]';
  const websiteUrl = '[TuSitioWeb.com]';
  const contactEmail = '[Su Correo Electrónico de Contacto]';

  return (
    <div className="container-custom py-16 pt-32 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{t('cookies.title')}</h1>
      <p className="text-sm text-gray-600 mb-4">{t('cookies.effectiveDateLabel')} {effectiveDate}</p>

      <div className="space-y-6 text-secondary">
        <section>
          <h2 className="text-xl font-semibold mb-2">{t('cookies.section1.title')}</h2>
          <p>{t('cookies.section1.paragraph1', { websiteUrl })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('cookies.section2.title')}</h2>
          <p className="mb-4">{t('cookies.section2.paragraph1')}</p>
          <p>{t('cookies.section2.paragraph2')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('cookies.section3.title')}</h2>
          <p className="mb-4">{t('cookies.section3.intro')}</p>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>{t('cookies.section3.item1.title')}</strong>
              <p className="ml-4">{t('cookies.section3.item1.description')}</p>
            </li>
            <li>
              <strong>{t('cookies.section3.item2.title')}</strong>
              <p className="ml-4">{t('cookies.section3.item2.description')}</p>
            </li>
            <li>
              <strong>{t('cookies.section3.item3.title')}</strong>
              <p className="ml-4">{t('cookies.section3.item3.description')}</p>
            </li>
            <li>
              <strong>{t('cookies.section3.item4.title')}</strong>
              <p className="ml-4">{t('cookies.section3.item4.description')}</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('cookies.section4.title')}</h2>
          <p className="mb-4">{t('cookies.section4.paragraph1')}</p>
          <p className="mb-4">{t('cookies.section4.paragraph2')}</p>
          <p className="mb-4">{t('cookies.section4.paragraph3')}</p>
          <p className="mb-2">{t('cookies.section4.browserSettingsLinksIntro')}</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('cookies.linkChrome')}</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('cookies.linkFirefox')}</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('cookies.linkSafari')}</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('cookies.linkEdge')}</a></li>
            <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('cookies.linkOpera')}</a></li>
          </ul>
          <p className="mb-4">{t('cookies.section4.paragraph4')}</p>
          <p>{t('cookies.section4.paragraph5')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('cookies.section5.title')}</h2>
          <p>{t('cookies.section5.paragraph1')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('cookies.section6.title')}</h2>
          <p className="mb-4">{t('cookies.section6.intro')}</p>
          <address className="not-italic">
            {t('cookies.section6.address.email', { contactEmail })}
          </address>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicy; 