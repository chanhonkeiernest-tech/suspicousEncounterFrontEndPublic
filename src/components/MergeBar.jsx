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
    window.location.reload();
  }, [merge, post]);

  if (!merge) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div role="alert">{error}</div>;

  const origin = data?.[0]?.origin ?? false;
  const topic = data?.[0]?.topic ?? "no title";
  const username = data?.[0]?.user?.username ?? "noname";

  return (
    <div className="mergebar">
      <h2>Select the best encounter post to merge {topic} by {username} to {" "}</h2>
      {merge && (
        <button type="button" onClick={clearMerge}>
          Clear selection
        </button>
      )}
    </div>
  );
};

export default MergeBar;