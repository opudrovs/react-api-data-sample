'use client';

import { Button, Modal, Text } from '@mantine/core';

type ConfirmModalProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * Reusable confirmation modal with external state control.
 */
export const ConfirmModal = ({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title} centered>
      <Text>{message}</Text>
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button color="red" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
