import { render } from '@testing-library/react';

import AddToChatList from './add-to-chat-list';

describe('AddToChatList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddToChatList />);
    expect(baseElement).toBeTruthy();
  });
});
