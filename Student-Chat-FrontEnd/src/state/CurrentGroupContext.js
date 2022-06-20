import { createContext, useState } from "react";

export const CurrentGroupContext = createContext();

export const CurrentGroupProvider = (props) => {
  const [currentGroup, setCurrentGroup] = useState({});
  return (
    <CurrentGroupContext.Provider value={[currentGroup, setCurrentGroup]}>
      {props.children}
    </CurrentGroupContext.Provider>
  );
};
