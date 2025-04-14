import axios from 'axios';

export const formatApiError = (method: string, error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return `API Error in ${method}: ${error.response?.data?.message || error.message}`;
  }
  return `Unexpected error in ${method}: ${error instanceof Error ? error.message : 'Unknown error'}`;
};
