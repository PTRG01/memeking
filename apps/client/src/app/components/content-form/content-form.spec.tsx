import { render } from '@testing-library/react';

import ContentForm from './content-form';

describe('ContentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentForm />);
    expect(baseElement).toBeTruthy();
  });
});
