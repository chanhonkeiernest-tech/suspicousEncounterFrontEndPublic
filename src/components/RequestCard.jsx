import { useState } from "react";
import useFetchPost from "../hooks/useFetchPost";


const RequestCard = ({data, reject}) => {
  const [mergeError, setMergeError] = useState("");
  const [action, setAction] = useState("");
  const [resolved, setResolved] = useState(false);
  const { isLoading, post } = useFetchPost();
  const encounterOrgin = data?.encounterOrgin ?? "no origin";
  const encounterToBeMerged = data?.encounterToBeMerged ?? "no child";
  const userO = data?.user1 ?? null;
  const userM = data?.user2 ?? null;
  const id = data?._id ?? null;

  const respond = async (url, actionName) => {
    setMergeError("");
    setAction(actionName);

    try {
      await post(url, { id });
      setResolved(true);
    } catch (error) {
      setMergeError(error instanceof Error ? error.message : `${actionName} failed`);
    } finally {
      setAction("");
    }
  };

  if (resolved) return null;

  return (
    <div className="request-data">
      <h2>
        Merge {encounterToBeMerged?.topic} by {userO?.username ?? "unknown user"} to{" "}
        {encounterOrgin?.topic} by {userM?.username ?? "unknown user"}{" "}
        <button type="button" onClick={() => respond("/encounterMerging", "Accept")} disabled={isLoading}>
          {isLoading && action === "Accept" ? "Accepting..." : "Accept"}
        </button>{" "}
        <button type="button" onClick={() => respond("/encounterMerge/reject", "Reject")} disabled={isLoading||reject}>
          {isLoading && action === "Reject" ? "Rejecting..." : "Reject"}
        </button>
      </h2>
      {mergeError && <p role="alert">{mergeError}</p>}
    </div>
  );
};

export default RequestCard;