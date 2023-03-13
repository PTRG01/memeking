import { render } from '@testing-library/react';

import ApplicationFrame from './application-frame';

describe('ApplicationFrame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationFrame />);
    expect(baseElement).toBeTruthy();
  });
});
