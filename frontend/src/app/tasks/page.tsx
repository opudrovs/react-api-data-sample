/**
 * Tasks Redirect Page
 *
 * This page automatically redirects users to the home page ("/").
 * It is a placeholder to handle route logic without rendering any UI.
 */

import { redirect } from 'next/navigation';

export default function TasksRedirect() {
  redirect('/');
}
