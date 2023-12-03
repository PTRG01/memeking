import { render } from '@testing-library/react';

import GroupItem from './group-item';

describe('GroupItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupItem />);
    expect(baseElement).toBeTruthy();
  });
});
