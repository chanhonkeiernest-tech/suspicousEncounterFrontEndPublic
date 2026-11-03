import { useState } from "react";
import AllEncounter from "../components/AllEncounter";
import MergeBar from "../components/MergeBar";
import { useSearch } from "../context/SearchContext"


const Encounter = () => {
    const {search, tag, type, issue, selectSearch, selectTag, selectType, selectIssue} = useSearch();
    const [inputSearch, setInputSearch] = useState(search);
    const [inputTag, setInputTag] = useState(tag);
    const [inputType, setInputType] = useState(type);
    const [inputIssue, setInputIssue] = useState(issue);

    const handleSubmit = (event) => {
        event.preventDefault();
        selectSearch(inputSearch);
        selectTag(inputTag);
        selectType(inputType);
        selectIssue(inputIssue);
    };
    return (
    <div className="home">
      <MergeBar />
      <h1>Encounters</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">search for name</label>
        <input
          id="search"
          value={inputSearch}
          onChange={(event) => setInputSearch(event.target.value)}
          defaultValues=""
        />
        <label htmlFor="tag">search for tag</label>
        <input
          id="tag"
          value={inputTag}
          onChange={(event) => setInputTag(event.target.value)}
          defaultValues=""
        />
        <label htmlFor="type">search for type</label>
        <select
          id="type"
          value={inputType}
          onChange={(event) => setInputType(event.target.value)}
        >
          <option value="">None</option>
          <option value="uncertain">Uncertain</option>
          <option value="certain">Certain</option>
        </select>
        <label htmlFor="issue">search for issue</label>
        <select
          id="issue"
          value={inputIssue}
          onChange={(event) => setInputIssue(event.target.value)}
        >
          <option value="">None</option>
          <option value="AI-slop">AI-slop</option>
          <option value="scam">scam</option>
          <option value="advertisement">advertisement</option>
        </select>
        <button type="submit">Set Search</button>
      </form>
      <AllEncounter />
    </div>
  );
};

export default Encounter;