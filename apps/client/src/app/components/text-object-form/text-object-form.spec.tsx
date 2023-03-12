import { render } from '@testing-library/react';

import TextObjectForm from './text-object-form';

describe('TextObjectForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextObjectForm />);
    expect(baseElement).toBeTruthy();
  });
});
