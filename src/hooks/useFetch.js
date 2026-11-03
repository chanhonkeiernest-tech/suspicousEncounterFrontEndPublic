import { useState, useEffect } from "react";

// A reusable data-fetching hook: any component can call useFetch(url)
const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (requestError) {
        setError(
          requestError instanceof TypeError
            ? "Could not connect to the server. Check that the backend is running."
            : requestError instanceof Error
              ? requestError.message
              : "Could not load data",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
