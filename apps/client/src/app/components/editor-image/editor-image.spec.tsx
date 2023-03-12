import { render } from '@testing-library/react';

import EditorImage from './editor-image';

describe('EditorImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorImage />);
    expect(baseElement).toBeTruthy();
  });
});
