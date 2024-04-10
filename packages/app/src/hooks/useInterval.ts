import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const intervalId = useRef<NodeJS.Timer>();

  const clear = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    intervalId.current = setInterval(() => savedCallback.current(), delay);
    return clear;
  }, [delay]);

  return { clear };
}
