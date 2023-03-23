import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import en from '../../config/i18n/messages';
// import pl from '../../config/i18n/messages';

/* eslint-disable-next-line */

i18next.use(initReactI18next).init({
  resources: {
    en: {
      nav: {
        home: 'Home',
        groups: 'Groups',
        create: 'Create',
        games: 'Games',
        profile: 'Profile',
        settings: 'Settings',
      },
      header: {
        signin: 'Sign In',
        signup: 'Sign Up',
      },
      form: {
        email: 'Email',
        password: 'Password',
      },
    },
    pl: {
      nav: {
        home: 'Strona główna',
        groups: 'Grupy',
        create: 'Stwórz',
        games: 'Gry',
        profile: 'Profil',
        settings: 'Ustawienia',
      },
      header: {
        signin: 'Zaloguj',
        signup: 'Stwórz konto',
      },
      form: {
        email: 'Email',
        password: 'Hasło',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

// export type TLocaleModel = 'en-US' | 'pl-PL';

// export interface ITranslateContext {
//   locale: object | string;
//   setLocale: object | string;
// }

// export const TranslateContext = React.createContext<ITranslateContext | null>(
//   null
// );

// export const TranslateProvider = ({ children }) => {
//   const [locale, setLocale] = useState<TLocaleModel>('en-US');

//   return (
//     <TranslateContext.Provider value={{ locale, setLocale }}>
//       <IntlProvider
//         textComponent={Fragment}
//         locale={locale}
//         messages={flattenObject(messages[locale])}
//         defaultLocale="en-US"
//       >
//         {children}
//       </IntlProvider>
//     </TranslateContext.Provider>
//   );
// };

// TranslateProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

// export const useTranslateContext = () => {
//   const data = useContext(TranslateContext);

//   if (!data) {
//     throw Error(
//       'useTranslateContext should be used inside of TranslateProvider'
//     );
//   }

//   return data;
// };

// export default TranslateProvider;
