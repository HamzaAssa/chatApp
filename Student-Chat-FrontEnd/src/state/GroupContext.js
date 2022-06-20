import { useState, createContext } from "react";

export const GroupContext = createContext();

export const GroupProvider = (props) => {
  const [Groups, setGroups] = useState([]);

  return (
    <GroupContext.Provider value={[Groups, setGroups]}>
      {props.children}
    </GroupContext.Provider>
  );
};
