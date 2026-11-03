import {useSearch} from "../context/SearchContext";
import EncounterCard from "./EncounterCard";
import useFetch from "../hooks/useFetch";
import MergeBar from "./MergeBar";


const AllEncounter = () => {
  const {search, tag, type, issue} = useSearch();
  const params = new URLSearchParams({ name: search, tag, type, issue });
  const EncounterURL = `/encounter?${params}`;
  const { data, isLoading, error } = useFetch(EncounterURL);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
 
  return (
    
    <div className="encounters">
      
      {data.map((encounter) => (
        <EncounterCard key={encounter.id} data={encounter} />
      ))}
    </div>
  );
};

export default AllEncounter;