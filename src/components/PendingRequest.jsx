
import useFetch from "../hooks/useFetch";
import RequestCard from "./RequestCard";

const PendingRequest = () => {
  const { data, isLoading, error } = useFetch("/merge");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div role="alert">{error}</div>;
 
  
  const dataP = data?.mergeP?? [];
  
  const dataR = data?.mergeR?? [];

  return (
    <div className="pending-requests">
      <h1>Pending request</h1>
      <div className="pending-requests-cards">
        {dataP.map((request) => (
          <RequestCard key={request.id ?? request._id} data={request} reject={false} />
        ))}
        {dataP.length===0&&<p>no pending request</p>}
      </div>
      <h1>Rejected request</h1>
      {dataR.map((request) => (
        <RequestCard key={request.id ?? request._id} data={request} reject={true}/>
      ))}

    </div>
  );
};

export default PendingRequest;