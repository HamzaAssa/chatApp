import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [logedUser, setLogedUser] = useState(null);
  return (
    <LoginContext.Provider value={[logedUser, setLogedUser]}>
      {props.children}
    </LoginContext.Provider>
  );
};
