/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("");
  const [issue, setIssue] = useState("");

  const selectSearch = (nextSearch) => {
    const trimmedSearch = nextSearch.trim();
    if (trimmedSearch) {
      setSearch(trimmedSearch);
    }
  };

  const selectTag = (nextTag) => {
    const trimmedTag = nextTag.trim();
    if (trimmedTag) {
      setTag(trimmedTag);
    }
  };

  const selectType = (nextType) => {
    const trimmedType = nextType.trim();
    setType(trimmedType);
  };

  const selectIssue = (nextIssue) => {
    const trimmedIssue = nextIssue.trim();
    setIssue(trimmedIssue);
  };


//   useEffect(() => {
//     localStorage.setItem("sus-user", user);
//   }, [merge]);

  return (
    <SearchContext.Provider value={{ search, tag, type, issue, selectSearch, selectTag, selectType, selectIssue}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be within its context");
  }
  return context;
};
