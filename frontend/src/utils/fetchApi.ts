'use client';

import { API_URL } from '@/constants';
import { logError } from '@/utils/logger';
import { showError } from '@/utils/notifications';

/**
 * Fetch API Utility
 *
 * A reusable function to handle API requests in a standardized way.
 *
 * Features:
 * - Automatically attaches credentials.
 * - Uses `cache: 'no-store'` by default to always fetch fresh data.
 * - Only adds `'Content-Type': 'application/json'` header when necessary (for requests with a body).
 * - Supports custom headers (e.g., authentication tokens).
 * - Ensures consistent error handling and logging.
 *
 * @template T - The expected response data type.
 * @param {string} endpoint - API endpoint (e.g., '/api/tasks').
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} [method='GET'] - HTTP method (defaults to GET).
 * @param {object} [body] - Request payload (only for POST, PUT, DELETE).
 * @param {Record<string, string>} [headers={}] - Optional custom headers.
 * @returns {Promise<T>} - Returns a promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */

export async function fetchApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        ...headers, // Allow custom headers
      },
      credentials: 'include', // Ensures cookies are sent
      cache: 'no-store', // Ensures fresh data by default
    };

    if (body) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        ...headers,
      };
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    logError(`Failed to fetch ${endpoint}`, error);
    showError('An error occurred while processing your request.');
    throw error;
  }
}
