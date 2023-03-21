import { render } from '@testing-library/react';

import TranslateProvider from './translate-provider';

describe('TranslateProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TranslateProvider />);
    expect(baseElement).toBeTruthy();
  });
});
