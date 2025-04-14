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
