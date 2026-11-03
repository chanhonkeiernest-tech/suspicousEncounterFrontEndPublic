import { useState } from "react";
import { Link } from "react-router-dom";
import RelatedCard from "./RelatedCard";
import { useMerge } from "../context/MergeContext";
import useFetchPost from "../hooks/useFetchPost";

const EncounterCard = ({ data, showDetailsLink = true }) => {
  const { merge, selectMerge, clearMerge } = useMerge();
  const [expand, setExpand] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeError, setMergeError] = useState("");
  const [mergeComplete, setMergeComplete] = useState(false);
  const id = data?._id ?? "";
  const topic = data?.topic ?? "no title";
  const description = data?.description ?? "no description";
  const type = data?.type ?? "uncertain";
  const issue = data?.issue ?? "";
  const tag = data?.tag ?? [];
  const img = data?.img ?? [];
  const user = data?.user ?? null;
  const username = user?.username ?? "noname";
  const related = data?.related ?? [];
  const { post } = useFetchPost();
  const isSelectedForMerge = Boolean(merge) && String(id) === merge;
  const origin = data?.origin;
  const relation = origin? "show related" : "the post best represent this"
  const relationC = origin? "hide related" : "hide the post best represent this"

  const handleMerge = async () => {
    if (merge==="") {
      selectMerge(String(id));
      setMergeComplete(false);
      setMergeError("");
      return;
    }

    if (String(id) === merge) {
      setMergeError("Choose a different encounter to merge.");
      return;
    }

    setIsMerging(true);
    setMergeError("");
    setMergeComplete(false);
    const url = "/encounterMerge";
    const dataSend = { idOrgin: id, idToBeMerged: merge };

    try {
      await post(url, dataSend);
      clearMerge();
      setMergeComplete(true);
    } catch (error) {
      setMergeError(error instanceof Error ? error.message : "Merge failed");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="encounter-data">
      <h2>
        Topic:{" "}
        {showDetailsLink && id ? (
          <Link to={`/encounter/${encodeURIComponent(id)}`}>{topic}</Link>
        ) : (
          topic
        )}
      </h2>
      <p>Type: {type}</p>
      <p>Issue: {issue}</p>
      <p>Description: {description}</p>
      <p>by:{username}</p>
      <p>tags: 
        {tag.map((element) => (
            <span>{element} </span>
        ))}
      </p>

      <p>images: 
        {img.map((element) => (
            <span>{element} </span>
        ))}
      </p>
      <button
        type="button"
        onClick={() => setExpand((isExpanded) => !isExpanded)}
        aria-expanded={expand}
        aria-controls={`related-encounters-${id}`}
      >
        {expand ? relationC : relation}
      </button>
      <div id={`related-encounters-${id}`} hidden={!expand}>
        {expand && related.map((element, index) => (
          <RelatedCard key={element.id ?? index} data={element} />
        ))}
      </div>

      {origin && <button
        type="button"
        onClick={handleMerge}
        disabled={!id || isMerging || isSelectedForMerge || !origin}
      >
        {isMerging
          ? "Merging..."
          : isSelectedForMerge
            ? "Selected to merge"
            : merge
              ? "Merge"
              : "Select to merge"}
      </button>}
      {isSelectedForMerge && !isMerging && (
        <p>Encounter selected to be merged. Choose its origin.</p>
      )}
      {mergeError && <p role="alert">{mergeError}</p>}
      {mergeComplete && <p role="status">Merge request submitted.</p>}
    </div>
  );
};

export default EncounterCard;