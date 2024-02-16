import { render } from '@testing-library/react';

import HeroHeader from './hero-header';

describe('Landing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeroHeader />);
    expect(baseElement).toBeTruthy();
  });
});
