import { render } from '@testing-library/react';

import ProfileWrapper from './profile-wrapper';

describe('ProfileWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
