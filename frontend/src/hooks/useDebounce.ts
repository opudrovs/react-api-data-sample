/**
 * Custom hook for debouncing a function call.
 *
 * This hook delays the execution of a function until after a specified delay
 * has elapsed since the last time it was invoked. Useful for optimizing
 * performance in cases like search input handling, resizing events, or API requests.
 */
export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};
