import { useCallback, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T,>(
  url: string,
  options?: RequestInit
): UseFetchState<T> & { refetch: () => Promise<void> } => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [url, options]);

  // Fetch al montar el componente
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  return { ...state, refetch };
};
