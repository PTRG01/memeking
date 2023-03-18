import { render } from '@testing-library/react';

import Groups from './groups';

describe('Groups', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Groups />);
    expect(baseElement).toBeTruthy();
  });
});
