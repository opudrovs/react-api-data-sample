'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/schemas/auth';
import { showError } from '@/utils/notifications';

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Login Form Component
 *
 * This component provides a user authentication form using `react-hook-form`
 * for form validation and submission.
 *
 * Features:
 * - Uses Zod schema for form validation.
 * - Integrates with the authentication context via `useAuth()`.
 * - Displays validation errors for email and password fields.
 * - Shows an error notification if login fails.
 */
export const LoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (!success) {
      showError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600">
      <h2 className="text-center text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
          classNames={{
            root: 'w-full',
          }}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
          classNames={{
            root: 'w-full',
          }}
        />

        <Group justify="center">
          <Button type="submit" loading={isSubmitting}>
            Login
          </Button>
        </Group>
      </form>
    </Box>
  );
};
