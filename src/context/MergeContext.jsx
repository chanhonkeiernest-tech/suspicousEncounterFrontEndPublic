/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const MergeContext = createContext();

export const MergeProvider = ({ children }) => {
  const [merge, setMerge] = useState("");

  const selectMerge = (nextMerge) => {
    const trimmedMerge = nextMerge.trim();
    if (trimmedMerge) {
      setMerge(trimmedMerge);
    }
  };

  const clearMerge = () => setMerge("");

  return (
    <MergeContext.Provider value={{ merge, selectMerge, clearMerge }}>
      {children}
    </MergeContext.Provider>
  );
};

export const useMerge = () => {
  const context = useContext(MergeContext);
  if (!context) {
    throw new Error("useMerge must be within its context");
  }
  return context;
};
