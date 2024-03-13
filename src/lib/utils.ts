/**
 * Utility functions for working with class names and Tailwind CSS.
 *
 * cn - Merges class names with Tailwind merge.
 *
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
