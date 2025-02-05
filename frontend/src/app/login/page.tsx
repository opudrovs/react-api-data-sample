/**
 * Login Page
 *
 * This page renders the login form, allowing users to sign in
 * to access their tasks and manage them.
 */
import { Metadata } from 'next';

import { LoginForm } from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Task Manager',
  description: 'Sign in to access your tasks and manage them effectively.',
};

export default function LoginPage() {
  return <LoginForm />;
}
