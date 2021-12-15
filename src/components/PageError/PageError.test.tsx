import { render, screen } from '@testing-library/react';

import PageError from './PageError';

test('should display default title and message', () => {
  render(<PageError />);

  const title = "This page is'nt available";
  const message = 'Something went wrong.';

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(message)).toBeInTheDocument();
});

test('should display correct title and message as props', () => {
  const title = 'Test error title';
  const message = 'Test error message';

  render(<PageError title={title} message={message} />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(message)).toBeInTheDocument();
});
