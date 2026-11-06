import { useCallback, useEffect, useRef, useState } from 'react';

export interface LatestRequestOptions {
  errorMessage?: string;
}

export const useLatestRequest = <A extends unknown[], T>(
  fn: (...args: A) => Promise<T>,
  { errorMessage = 'Something went wrong. Try again.' }: LatestRequestOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [lastArgs, setLastArgs] = useState<A | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Solo cuenta la última petición
  const requestId = useRef(0);
  const fnRef = useRef(fn);
  const messageRef = useRef(errorMessage);
  fnRef.current = fn;
  messageRef.current = errorMessage;

  useEffect(
    () => () => {
      requestId.current++;
    },
    []
  );

  const run = useCallback(async (...args: A): Promise<T | undefined> => {
    const id = ++requestId.current;
    setData(null);
    setLastArgs(null);
    setError(null);
    setLoading(true);
    try {
      const result = await fnRef.current(...args);
      if (id !== requestId.current) return undefined;
      setData(result);
      setLastArgs(args);
      return result;
    } catch {
      if (id === requestId.current) setError(messageRef.current);
      return undefined;
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    requestId.current++;
    setData(null);
    setLastArgs(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, lastArgs, loading, error, run, reset };
};
