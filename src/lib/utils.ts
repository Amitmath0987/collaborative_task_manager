import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isDateOverdue(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

// Task utilities
export function getPriorityWeight(priority: string): number {
  const weights = { High: 3, Medium: 2, Low: 1 };
  return weights[priority as keyof typeof weights] || 0;
}

export function sortTasksByPriority<T extends { priority: string }>(
  tasks: T[]
): T[] {
  return [...tasks].sort(
    (a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
  );
}

export function sortTasksByDueDate<T extends { dueDate?: string }>(
  tasks: T[]
): T[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

// String utilities
export function truncateString(str: string, maxLength: number = 100): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Local storage utilities (for potential future use)
export function safeLocalStorage() {
  const isClient = typeof window !== "undefined";

  return {
    getItem: (key: string): string | null => {
      if (!isClient) return null;
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string): void => {
      if (!isClient) return;
      try {
        localStorage.setItem(key, value);
      } catch {
        // Fail silently
      }
    },
    removeItem: (key: string): void => {
      if (!isClient) return;
      try {
        localStorage.removeItem(key);
      } catch {
        // Fail silently
      }
    },
  };
}
