export const debounce = <F extends (...args: unknown[]) => unknown>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

export function debounceNumberInput(fn: (value: number | null) => void, delay = 300): (value: number | null) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (value: number | null) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
}
