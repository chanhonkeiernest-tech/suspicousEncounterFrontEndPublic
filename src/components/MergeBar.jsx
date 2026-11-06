import { useEffect } from "react";
import { useMerge } from "../context/MergeContext";
import useFetchPost from "../hooks/useFetchPost";

const MergeBar = () => {
  const { merge, clearMerge } = useMerge();
  const { data, error, isLoading, post } = useFetchPost();

  useEffect(() => {
    if (merge) {
      void post("/encounterOne", { id: merge }).catch(
        () => {},
      );
    }
  }, [merge, post]);

  if (!merge) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div role="alert">{error}</div>;

  const origin = data?.origin ?? false;
  const topic = data?.topic ?? "no title";
  const username = data?.user?.username ?? "noname";

  return (
    <h2 className="mergebar">
      Select the best encounter post to merge {topic} by {username} to{" "}
      {merge && (
        <button type="button" onClick={clearMerge}>
          Clear selection
        </button>
      )}
    </h2>
  );
};

export default MergeBar;