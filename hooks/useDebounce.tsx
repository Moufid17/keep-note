import { useState, useRef, useEffect, useCallback } from 'react'

type UseDebounceType = (value: string, delay: number) => string
type UseDebounceCallBackType = (callback: (value?: string) => void, delay: number) => void

/**
 * Custom hook to debounce a value.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @param callback - Optional callback to execute after the value is debounced.
 * @returns The debounced value.
 */
export const useDebounceValue : UseDebounceType = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const updateTimeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        clearTimeout(updateTimeout)
    }, [value, delay])
    return debounceValue
}

/**
 * Custom hook to debounce a value.
 * @param callback - Execute after the value is debounced.
 * @param delay - The delay in milliseconds.
 * @returns A debounced callback function.
 */
export function useDebounceCallback<T extends (...args: any[]) => void> ( callback: T, delay: number ): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedFn;
}

