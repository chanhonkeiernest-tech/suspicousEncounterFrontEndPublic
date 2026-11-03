import { useLocation } from "react-router-dom";

const NewMerge = () => {
  const { state } = useLocation();
  const encounter = state?.encounter;

  return (
    <main>
      <h1>New Merge</h1>
      {encounter ? (
        <section aria-label="Encounter selected for merge">
          <h2>{encounter.topic ?? "Untitled encounter"}</h2>
          <p>{encounter.description ?? "No description"}</p>
        </section>
      ) : (
        <p>Select an encounter to start a merge.</p>
      )}
    </main>
  );
};

export default NewMerge;
