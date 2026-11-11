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

  const encounters = Array.isArray(data) ? data : [data];

  return (
    <div className="encounter-details">
      <MergeBar />
      <div className="main-encounter-detail">
        <EncounterCard data={encounters[0]} showDetailsLink={false} />
      </div>
      <h1>Similar encounter</h1>
      {encounters.length <= 1 && <p>No recommendation</p>}
      <div className="recommend-encounter-detail">
        
        {encounters.slice(1).map((encounter) => (
          <EncounterCard key={encounter.id} data={encounter} />
        ))}
      </div>
    </div>
  );
};

export default EncounterDetails;
