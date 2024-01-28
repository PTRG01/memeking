import { Button, Group, Modal, Text } from '@mantine/core';

export interface IConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: (value: boolean) => void;
  message: string;
  open: boolean;
}

export function ConfirmModal({
  onConfirm,
  onCancel,
  onClose,
  message = 'Do you want to proceed?',
  open,
}: IConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose(false);
  };
  return (
    <Modal
      radius={15}
      onClose={() => onClose(!open)}
      opened={open}
      padding={25}
    >
      <Text mb={25}>{message}</Text>
      <Group position="apart">
        <Button onClick={() => handleConfirm()}>Confirm</Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
      </Group>
    </Modal>
  );
}

export default ConfirmModal;
