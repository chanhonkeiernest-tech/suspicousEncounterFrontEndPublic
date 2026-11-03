import { useState } from "react";
import { Link } from "react-router-dom";
import RelatedCard from "./RelatedCard";
import { useMerge } from "../context/MergeContext";
import useFetchPost from "../hooks/useFetchPost";
import useFetchDelete from "../hooks/useFetchDelete"; 

const UnmergeEncounterCard = ({ data, showDetailsLink = true }) => {
  const { merge, selectMerge, clearMerge } = useMerge();
  const [expand, setExpand] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [isUnmerging, setIsUnmerging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mergeError, setMergeError] = useState("");
  const [unmergeError, setUnmergeError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [mergeComplete, setMergeComplete] = useState(false);
  const [unmergeComplete, setUnmergeComplete] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);


  const id = data?._id ?? "";
  const topic = data?.topic ?? "no title";
  const description = data?.description ?? "no description";
  const tag = data?.tag ?? [];
  const img = data?.img ?? [];
  const user = data?.user ?? null;
  const username = user?.username ?? "noname";
  const related = data?.related ?? [];
  const { post } = useFetchPost();
  const { deleting } = useFetchDelete();
  const isSelectedForMerge = Boolean(merge) && String(id) === merge;
  const origin = data?.origin;
  const relation = origin ? "show related" : "the post best represent this";
  const relationC = origin ? "hide related" : "hide the post best represent this";

  const handleMerge = async () => {
    if (merge === "") {
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
    const dataSend = { idOrgin: id, idToBeMerged: merge };

    try {
      await post("/encounterMerge", dataSend);
      clearMerge();
      setMergeComplete(true);
      window.location.reload();
    } catch (error) {
      setMergeError(error instanceof Error ? error.message : "Merge failed");
    } finally {
      setIsMerging(false);
    }
  };

  const handleUnmerge = async () => {
    setIsUnmerging(true);
    setUnmergeError("");
    setUnmergeComplete(false);
    const dataSend = { id: id };
    try {
      await deleting("/merge",dataSend );
      

      setUnmergeComplete(true);
      window.location.reload();
    } catch (error) {
      setUnmergeError(error instanceof Error ? error.message : "Unmerge failed");
    } finally {
      setIsUnmerging(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");
    setDeleteComplete(false);
    const dataSend = { id: id };
    try {
      if(origin===true) {
        await deleting("/encounter",dataSend );
        window.location.reload();
      }
      
      

      setDeleteComplete(true);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Unmerge failed");
    } finally {
      setIsDeleting(false);
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
      <p>Description: {description}</p>
      <p>by:{username}</p>
      <p>
        tags:
        {tag.map((element, index) => (
          <span key={`${element}-${index}`}>{element} </span>
        ))}
      </p>

      <p>
        images:
        {img.map((element, index) => (
          <span key={`${element}-${index}`}>{element} </span>
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
        {expand &&
          related.map((element, index) => (
            <RelatedCard key={element.id ?? index} data={element} />
          ))}
      </div>

      {origin && (
        <><button
          type="button"
          onClick={handleMerge}
          disabled={!id || isMerging || isSelectedForMerge||isDeleting}
        >
          {isMerging
            ? "Merging..."
            : isSelectedForMerge
              ? "Selected to merge"
              : merge
                ? "Merge"
                : "Select to merge"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!id || isMerging || isSelectedForMerge||isDeleting}
        >
            {isDeleting
              ? "Deleting..."
              : isSelectedForMerge
                ? "Selected to merge"
                : merge
                  ? "Delete"
                  : "Delete"}
          </button></>


      )}
      {origin === false && (
        <button
          type="button"
          onClick={handleUnmerge}
          disabled={!id || isUnmerging || unmergeComplete}
        >
          {isUnmerging ? "Unmerging..." : unmergeComplete ? "Unmerged" : "Unmerge"}
        </button>
      )}
      {isSelectedForMerge && !isMerging && (
        <p>Encounter selected to be merged. Choose its origin.</p>
      )}
      {mergeError && <p role="alert">{mergeError}</p>}
      {mergeComplete && <p role="status">Merge request submitted.</p>}
      {unmergeError && <p role="alert">{unmergeError}</p>}
      {unmergeComplete && <p role="status">Encounter unmerged.</p>}
      {deleteError && <p role="alert">{deleteError}</p>}
      {deleteComplete && <p role="status">Encounter deleted.</p>}
    </div>
  );
};

export default UnmergeEncounterCard;
