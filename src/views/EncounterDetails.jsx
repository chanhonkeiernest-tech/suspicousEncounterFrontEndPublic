import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import EncounterCard from "../components/EncounterCard";
import MergeBar from "../components/MergeBar";


const EncounterDetails = () => {
  const { id } = useParams();
  const requestOptions = useMemo(
    () => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }),
    [id],
  );
  const { data, isLoading, error } = useFetch(
    id ? "/encounterOne" : null,
    requestOptions,
  );

  if (isLoading) return <div>Loading encounter details...</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!data) return <div>Encounter not found.</div>;

  

  return (
    <div className="encounter-details">
      <MergeBar />
      <EncounterCard data={data} showDetailsLink={false} />
    </div>
  );
};

export default EncounterDetails;
