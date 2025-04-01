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

export function formatPhoneNumber(phone: string): string {
  if (!/^09\d{9}$/.test(phone)) {
    throw new Error("Invalid phone number format");
  }

  return `(${phone.slice(0, 4)}) ${phone.slice(4, 7)} ${phone.slice(7)}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
