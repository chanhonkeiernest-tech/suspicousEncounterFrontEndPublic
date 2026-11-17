import { Link } from "react-router-dom";
//Display a single child encounter as a card. Used by any card that display a parent encounter or in some case a child to display its parent
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