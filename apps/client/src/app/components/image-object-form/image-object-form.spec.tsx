import { render } from '@testing-library/react';

import ImageObjectForm from './image-object-form';

describe('ImageObjectForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageObjectForm />);
    expect(baseElement).toBeTruthy();
  });
});
