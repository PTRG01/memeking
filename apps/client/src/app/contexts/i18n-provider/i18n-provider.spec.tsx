import { render } from '@testing-library/react';

import i18n from './i18n';

describe('TranslateProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<i18n />);
    expect(baseElement).toBeTruthy();
  });
});
