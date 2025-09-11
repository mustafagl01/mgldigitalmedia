import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining Tailwind CSS classes
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}