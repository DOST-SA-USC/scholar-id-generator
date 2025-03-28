import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<
  T extends (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
>(func: T, delay: number = 500) {
  let timer: ReturnType<typeof setTimeout>;

  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(e), delay);
  };
}
