import { render } from '@testing-library/react';

import MessageItem from './message-item';

describe('MessageItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageItem />);
    expect(baseElement).toBeTruthy();
  });
});
