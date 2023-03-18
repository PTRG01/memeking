import { render } from '@testing-library/react';

import Creator from './creator';

describe('Creator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Creator />);
    expect(baseElement).toBeTruthy();
  });
});
