import { render } from '@testing-library/react';

import UserListItem from './user-list-item';

describe('UserListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserListItem />);
    expect(baseElement).toBeTruthy();
  });
});
