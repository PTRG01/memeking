import { Alert, Notification, Text } from '@mantine/core';
import { X } from 'tabler-icons-react';

export interface IErrorMessageProps {
  message: string;
}

export function ErrorMessage({
  message = 'Something went wrong',
}: IErrorMessageProps) {
  console.log(message);
  return (
    <Alert icon={<X size="1.1rem" />} color="red" radius={15}>
      <Text color="red">{message}</Text>
    </Alert>
  );
}

export default ErrorMessage;
