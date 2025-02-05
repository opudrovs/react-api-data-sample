import { Button as MantineButton } from '@mantine/core';
import cx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';

/**
 * Props for the Button component.
 */
interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outline' | 'gradient';
  color?: string;
  className?: string;
}

/**
 * Button component with custom styling.
 * It supports light and dark mode and gradient or solid color background.
 */
export const Button = ({
  children,
  onClick,
  loading,
  disabled,
  type = 'button',
  variant = 'gradient',
  color,
  className,
}: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <MantineButton
      loading={loading}
      disabled={disabled}
      variant={variant}
      gradient={
        theme === 'dark'
          ? { from: 'violet', to: 'blue', deg: 90 }
          : { from: 'blue', to: 'cyan', deg: 90 }
      }
      color={color}
      type={type}
      onClick={onClick}
      className={cx('transition transform active:scale-95', className)}
    >
      {children}
    </MantineButton>
  );
};
