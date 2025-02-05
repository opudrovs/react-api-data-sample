/**
 * Notification Utilities
 *
 * This module provides helper functions for displaying notifications
 * using the Mantine notifications system.
 */

import { notifications } from '@mantine/notifications';

import styles from './notifications.module.css';

/**
 * Displays a success notification with a green background.
 */
export const showSuccess = (message: string) => {
  notifications.show({
    title: 'Success',
    message,
    color: 'green',
    classNames: styles,
  });
};

/**
 * Displays an error notification with a red background.
 */
export const showError = (message: string) => {
  notifications.show({
    title: 'Error',
    message,
    color: 'red',
    classNames: styles,
  });
};

/**
 * Displays an info notification with a blue background.
 */
export const showInfo = (message: string) => {
  notifications.show({
    title: 'Information',
    message,
    color: 'blue',
    classNames: styles,
  });
};
