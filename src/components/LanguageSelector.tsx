import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'es', name: t('language.es') },
    { code: 'it', name: t('language.it') },
    { code: 'pt', name: t('language.pt') }
  ];

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="bg-transparent text-primary hover:text-accent transition-colors cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};