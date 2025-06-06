import React, { useEffect } from 'react'

type UseDebounceType = (value: string, delay: number, callback?: () => void) => string

/**
 * Custom hook to debounce a value.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @param callback - Optional callback to execute after the value is debounced.
 * @returns The debounced value.
 */
const useDebounce : UseDebounceType = (value, delay, callback) => {
    const [debounceValue, setDebounceValue] = React.useState(value)

    useEffect(() => {
        const updateTimeout = setTimeout(() => {
            setDebounceValue(value)
            if (callback) {
                callback()
            }
        }, delay)
        clearTimeout(updateTimeout)
    }, [value, delay, callback])
    return debounceValue
}

export default useDebounce