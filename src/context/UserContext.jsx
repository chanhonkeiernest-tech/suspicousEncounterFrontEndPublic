import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const userProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("location") || "New York"
  );

  const changeUser = (nextLocation) => {
    const trimmedLocation = nextLocation.trim();
    if (trimmedLocation) {
      setLocation(trimmedLocation);
    }
  };

  useEffect(() => {
    localStorage.setItem("sus-user", user);
  }, [user]);

  return (
    <LocationContext.Provider value={{ location, changeLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useuser = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
