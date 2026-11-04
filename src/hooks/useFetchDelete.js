import { useCallback, useState } from "react";
import { apiUrl } from "../api";

const readResponse = async (response) => {
  const body = await response.text();
  if (!body) return null;

  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
};

const useFetchDelete = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleting = useCallback(async (url, payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl(url), {
        method: "Delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await readResponse(response);

      if (!response.ok) {
        const message =
          result && typeof result === "object" && typeof result.message === "string"
            ? result.message
            : `Request failed (${response.status})`;
        throw new Error(message);
      }

      setData(result);
      return result;
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : "Request failed";
      setError(message);
      throw requestError instanceof Error ? requestError : new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, deleting };
};

export default useFetchDelete;
