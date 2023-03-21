import React from 'react';
import { useMemo, useState, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import flattenObject from '../../helpers/flatten';
import messages from '../../config/i18n/messages';

/* eslint-disable-next-line */

export type TLocaleModel = 'en-US' | 'pl-PL';

export interface ITranslateContext {
  locale: object | string;
  setLocale: object | string;
}

export const TranslateContext = React.createContext<ITranslateContext | null>(
  null
);

export const TranslateProvider = ({ children }) => {
  const [locale, setLocale] = useState<TLocaleModel>('en-US');

  return (
    <TranslateContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        textComponent={Fragment}
        locale={locale}
        messages={flattenObject(messages[locale])}
        defaultLocale="en-US"
      >
        {children}
      </IntlProvider>
    </TranslateContext.Provider>
  );
};

TranslateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useTranslateContext = () => {
  const data = useContext(TranslateContext);

  if (!data) {
    throw Error(
      'useTranslateContext should be used inside of TranslateProvider'
    );
  }

  return data;
};

export default TranslateProvider;
