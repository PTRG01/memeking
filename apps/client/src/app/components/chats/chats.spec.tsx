import { render } from '@testing-library/react';

import Chats from './chats';

describe('Chats', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chats />);
    expect(baseElement).toBeTruthy();
  });
});
