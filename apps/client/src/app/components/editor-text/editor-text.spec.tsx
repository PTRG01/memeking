import { render } from '@testing-library/react';

import EditorText from './editor-text';

describe('EditorText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorText />);
    expect(baseElement).toBeTruthy();
  });
});
