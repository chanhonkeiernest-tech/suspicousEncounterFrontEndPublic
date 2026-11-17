
import UnmergeEncounterCard from "./UnmergeEncounterCard";
import useFetch from "../hooks/useFetch";


//Display of all encounter created by the current user. Display using umergeEcounterCard
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