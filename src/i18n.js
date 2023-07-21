import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
const resources = {
  de: {
    translation: de
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug: true,

    

    react: {
      defaultTransParent: 'div', // needed for preact
      wait: true,
    },
  });

export default i18n;