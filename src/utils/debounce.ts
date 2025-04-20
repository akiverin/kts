export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  let timer: number;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function debounceNumberInput(fn: (value: number | null) => void, delay = 300): (value: number | null) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (value: number | null) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
}
