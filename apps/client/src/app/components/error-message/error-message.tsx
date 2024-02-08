import { Alert, Text } from '@mantine/core';
import { X } from 'tabler-icons-react';

export interface IErrorMessageProps {
  error: Error;
  onClose: () => void;
}

export function ErrorMessage({ error, onClose }: IErrorMessageProps) {
  return (
    <Alert
      icon={<X size="1.1rem" />}
      color="red"
      radius={15}
      onClose={() => onClose()}
      withCloseButton
    >
      <Text color="red">{error?.message}</Text>
    </Alert>
  );
}

export default ErrorMessage;
