import { render } from '@testing-library/react';

import MemeEditor from './meme-editor';

describe('MemeEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemeEditor />);
    expect(baseElement).toBeTruthy();
  });
});
