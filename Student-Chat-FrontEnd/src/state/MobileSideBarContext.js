import { useState, createContext } from "react";

export const MobileSideBarContext = createContext();

export const MobileSideBarProvider = (props) => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  return (
    <MobileSideBarContext.Provider
      value={[mobileSideBarOpen, setMobileSideBarOpen]}
    >
      {props.children}
    </MobileSideBarContext.Provider>
  );
};
