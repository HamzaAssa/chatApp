import { useContext, useEffect } from "react";
import checkLogedUser from "../../utils/checkLogedUser";
import { LoginContext } from "../../state/LoginContext";
import { MessageProvider } from "../../state/MessageContext";

import { useNavigate } from "react-router-dom";
import Chats from "../Chat/Chats";
import SideBar from "../SideBar/SideBar";
import { GroupProvider } from "../../state/GroupContext";
import { CurrentGroupProvider } from "../../state/CurrentGroupContext";
const Home = () => {
  const navigate = useNavigate();
  const [logedUser, setLogedUser] = useContext(LoginContext);

  useEffect(() => {
    if (checkLogedUser()) {
      setLogedUser(JSON.parse(localStorage.getItem("std-profile")).user);
    } else {
      setLogedUser(null);
    }
  }, []);

  return (
    <>
      <div id="maniContainer">
        <GroupProvider>
          <CurrentGroupProvider>
            <MessageProvider>
              <SideBar />
              <Chats />
            </MessageProvider>
          </CurrentGroupProvider>
        </GroupProvider>
      </div>
    </>
  );
};

export default Home;
