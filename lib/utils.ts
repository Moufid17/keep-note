import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ErrorResponse = {
  errorMessage: string
}

export const handleError = (error: unknown) : ErrorResponse => {
  if (error instanceof Error) {
    return {errorMessage: error.message}
  }
  return {errorMessage: "An unknown error occurred."}
}