import { render } from '@testing-library/react';

import AuthLoader from './auth-loader';

describe('AuthLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthLoader />);
    expect(baseElement).toBeTruthy();
  });
});
