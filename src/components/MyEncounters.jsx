import {useSearch} from "../context/SearchContext";
import UnmergeEncounterCard from "./UnmergeEncounterCard";
import useFetch from "../hooks/useFetch";
import MergeBar from "./MergeBar";


const MyEncounters = () => {
  
  const EncounterURL = `/myEncounter`;
  const { data, isLoading, error } = useFetch(EncounterURL);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
 
  return (
    
    <div className="encounters">
      
      {data.map((encounter) => (
        <UnmergeEncounterCard key={encounter.id} data={encounter} />
      ))}
    </div>
  );
};

export default MyEncounters;