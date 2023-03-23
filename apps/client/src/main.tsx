import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import i18next from '../src/app/contexts/translate-provider/translate-provider';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
