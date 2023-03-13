import { render } from '@testing-library/react';

import EditorObject from './editor-object';

describe('EditorObject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorObject />);
    expect(baseElement).toBeTruthy();
  });
});
