import { render } from '@testing-library/react';

import FollowersSearch from './followers-search';

describe('FollowersSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FollowersSearch />);
    expect(baseElement).toBeTruthy();
  });
});
