import { fetchApi } from '@/utils/fetchApi';

describe('fetchApi Utility', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should perform a GET request and return data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    const response = await fetchApi<{ message: string }>('/api/test');
    expect(response).toEqual({ message: 'Success' });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      {
        method: 'GET',
        headers: {},
        credentials: 'include',
        cache: 'no-store',
      }
    );
  });

  it('should perform a POST request and return data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Created' }),
    });

    const response = await fetchApi<{ message: string }>('/api/test', 'POST', {
      data: 'test',
    });

    expect(response).toEqual({ message: 'Created' });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ data: 'test' }),
      }
    );
  });

  it('should perform a PUT request and return data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Updated' }),
    });

    const response = await fetchApi<{ message: string }>('/api/test', 'PUT', {
      updated: true,
    });

    expect(response).toEqual({ message: 'Updated' });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ updated: true }),
      }
    );
  });

  it('should perform a DELETE request successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => undefined,
    });

    await expect(fetchApi('/api/test', 'DELETE')).resolves.toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      {
        method: 'DELETE',
        headers: {},
        credentials: 'include',
        cache: 'no-store',
      }
    );
  });

  it('should throw an error for a failed request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ error: 'Internal Server Error' }),
    });

    await expect(fetchApi('/api/error')).rejects.toThrow(
      'API Error: 500 Internal Server Error'
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/error'),
      {
        method: 'GET',
        headers: {},
        credentials: 'include',
        cache: 'no-store',
      }
    );
  });
});
