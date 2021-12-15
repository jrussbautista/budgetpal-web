import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ConfirmDialog from './ConfirmDialog';

test('should display correct title and message', () => {
  const title = 'Test title';
  const message = 'Test Message';

  const onClose = jest.fn();
  const onConfirm = jest.fn();

  render(
    <ConfirmDialog
      title={title}
      message={message}
      isVisible={true}
      onClose={onClose}
      onConfirm={onConfirm}
      isConfirming={false}
    />
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(message)).toBeInTheDocument();
});

test('should shows the cancel and a okay button', () => {
  const title = 'Test title';
  const message = 'Test Message';

  const onClose = jest.fn();
  const onConfirm = jest.fn();

  render(
    <ConfirmDialog
      title={title}
      message={message}
      isVisible={true}
      onClose={onClose}
      onConfirm={onConfirm}
      isConfirming={false}
    />
  );

  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  userEvent.click(cancelButton);
  expect(onClose).toHaveBeenCalledTimes(1);

  const okayButton = screen.getByRole('button', { name: /okay/i });
  userEvent.click(okayButton);
  expect(onConfirm).toHaveBeenCalledTimes(1);
});
