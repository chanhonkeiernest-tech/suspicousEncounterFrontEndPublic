import { Link } from "react-router-dom";

const RelatedCard = ({data}) => {
    //const current = data?.current ?? {};
     const id = data?._id ?? "no id";
  const topic = data?.topic ?? "no title";
  const description = data?.description ?? "no description";
  const img = data?.img ?? [];
 const type = data?.type ?? "uncertain";
  const issue = data?.issue ?? "";
  

 
  return (
    <div className="encounter-data">
      <h2>Topic:{" "}
        {id ? (
          <Link to={`/encounter/${encodeURIComponent(id)}`}>{topic}</Link>
        ) : (
          topic
        )}</h2>
      <p>Type: {type}</p>
      <p>Issue: {issue}</p>
      <p>{description}</p>

      <p>images: 
        {img.map((element) => (
            <span>{element} </span>
        ))}
      </p>
    </div>
  );
};

export default RelatedCard;