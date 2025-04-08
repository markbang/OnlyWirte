import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { version } from '../package.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getversion() {
  return version;
}
