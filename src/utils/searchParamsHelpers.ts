export function updateSearchParam(params: URLSearchParams, key: string, value: string | null): URLSearchParams {
  if (value === null) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  return params;
}

export function resetPageParam(params: URLSearchParams): URLSearchParams {
  params.set('page', '1');
  return params;
}
