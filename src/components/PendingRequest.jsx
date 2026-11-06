
import useFetch from "../hooks/useFetch";
import RequestCard from "./RequestCard";

const PendingRequest = () => {
  const { data, isLoading, error } = useFetch("/merge");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div role="alert">{error}</div>;
 
  
  const dataP = data?.mergeP?? [];
  
  const dataR = data?.mergeR?? [];

  return (
    <div className="encounters">
      <h1>Pending request</h1>
      {dataP.map((request) => (
        <p><RequestCard key={request.id ?? request._id} data={request} reject={false} /></p>
      ))}
      {dataP.length===0&&<p>no pending request</p>}

      <h1>Rejected request</h1>
      {dataR.map((request) => (
        <RequestCard key={request.id ?? request._id} data={request} reject={true}/>
      ))}

    </div>
  );
};

export default PendingRequest;