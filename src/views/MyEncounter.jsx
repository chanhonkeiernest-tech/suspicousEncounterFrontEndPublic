import MergeBar from "../components/MergeBar";
import MyEncounters from "../components/MyEncounters";
//My encounter 
const MyEncounter = () => {

    return(
        <div className="my=profile">
            <MergeBar />
           <h2>My posts</h2> 
            <MyEncounters />
        </div>
    );
};
export default MyEncounter;