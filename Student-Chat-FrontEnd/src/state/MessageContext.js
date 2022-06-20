import { createContext, useState, useEffect } from "react";

export const MessageContext = createContext();
export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    return () => {
      setMessages([]);
    };
  }, []);
  return (
    <MessageContext.Provider value={[messages, setMessages]}>
      {props.children}
    </MessageContext.Provider>
  );
};
