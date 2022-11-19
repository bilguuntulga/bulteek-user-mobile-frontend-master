/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default (fetcher, data, options = {}) => (init = {}) => {
  const [result, setResult] = React.useState(init);
  const [loading, setLoading] = React.useState(true);
  const [error,setError] = React.useState(null);

  const reload = React.useCallback(
    async (signal) => {
      try {
        setLoading(true);
        let res = await fetcher(data, { ...options, signal });
        setResult(res);
        setLoading(false);
      } catch (err) {
        setResult(init);
        setLoading(false);
        setError(err);
      }
    },
    [fetcher, options]
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    reload(signal);

    return () => abortController.abort();
  }, [data]);

  return {
    result,
    error ,
    loading,
    setResult: (value) => {
      setResult(value);
    },
    reload: () => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      reload(signal);

      return () => abortController.abort();
    }
  };
};
