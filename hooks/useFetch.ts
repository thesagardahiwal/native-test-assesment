import { useState, useEffect } from 'react';

type UseFetchOptions = RequestInit & {
  skip?: boolean; // To skip the fetch on the initial render
};

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T = unknown>(url: string, options?: UseFetchOptions) {
  const { skip = false, ...requestOptions } = options || {};
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: T = await response.json();
      setState({ data: result, loading: false, error: null });
    } catch (err: any) {
      setState({ data: null, loading: false, error: err.message });
    }
  };

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, [url, skip, JSON.stringify(requestOptions)]); // Re-fetch if URL or options change

  return { ...state, refetch: fetchData };
}

export default useFetch;
