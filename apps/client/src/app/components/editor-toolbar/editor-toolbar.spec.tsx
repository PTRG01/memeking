import { render } from '@testing-library/react';

import EditorToolbar from './editor-toolbar';

describe('EditorToolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorToolbar />);
    expect(baseElement).toBeTruthy();
  });
});
