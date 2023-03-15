import { render } from '@testing-library/react';

import Games from './games';

describe('Games', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Games />);
    expect(baseElement).toBeTruthy();
  });
});
