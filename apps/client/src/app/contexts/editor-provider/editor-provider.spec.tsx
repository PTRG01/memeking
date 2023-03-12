import { render } from '@testing-library/react';

import EditorProvider from './editor-provider';

describe('EditorProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorProvider />);
    expect(baseElement).toBeTruthy();
  });
});
