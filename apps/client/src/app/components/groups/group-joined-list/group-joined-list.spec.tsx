import { render } from '@testing-library/react';

import GroupJoinedList from './group-joined-list';

describe('GroupJoinedList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupJoinedList />);
    expect(baseElement).toBeTruthy();
  });
});
