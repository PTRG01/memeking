import { render } from '@testing-library/react';

import ProfileProvider from './profile-provider';

describe('ProfileProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileProvider />);
    expect(baseElement).toBeTruthy();
  });
});
