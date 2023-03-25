import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../config/i18n/messages/en';
import pl from '../../config/i18n/messages/pl';

/* eslint-disable-next-line */

i18n.use(initReactI18next).init({
  resources: { en, pl },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
