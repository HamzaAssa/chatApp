import { useContext, useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Chat from "./Chat/Chat";
import SendMessage from "./SendMessage/SendMessage";

import { LoginContext } from "../../state/LoginContext";
import { MessageContext } from "../../state/MessageContext";
import { CurrentGroupContext } from "../../state/CurrentGroupContext";
import { getAllMessages } from "../../api";

const Chats = () => {
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [messages, setMessages] = useContext(MessageContext);
  const [currentGroup, setCurrentGroup] = useContext(CurrentGroupContext);
  const token = JSON.parse(localStorage.getItem("std-profile"))?.token;
  useEffect(async () => {
    if (token && currentGroup) {
      const result = await getAllMessages(token, currentGroup?.name);
      setMessages(result);
    }
  }, [currentGroup]);
  useEffect(() => {
    setInterval(async () => {
      const groupName = JSON.parse(localStorage.getItem("current-group"))?.name;
      if (groupName) {
        const result = await getAllMessages(token, groupName);
        setMessages(result);
      }
    }, 5000);
  }, []);

  return (
    <Container
      sx={{
        width: "100vw",
        mt: 3,
        pt: 2,
        px: 3,
        minHeight: "90.95vh",
        background: `
    linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
    linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
    linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
    linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
    linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
    linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);`,
        backgroundColor: "#131313",
        backgroundSize: "20px 20px",
      }}
    >
      <Grid
        container
        direction="column"
        spacing={0}
        sx={{
          pt: 3,
          pb: 8,
        }}
      >
        {!token ? (
          <Typography
            variant="body1"
            color="white"
            sx={{
              maxWidth: 270,
              fontSize: 18,
              display: "inline",
              px: 2,
              mt: 5,
              backgroundColor: "#4f706c",
              borderRadius: 5,
              alignSelf: "end",
            }}
          >
            Currently you are not logged in !
          </Typography>
        ) : logedUser?.groups.length < 1 ? (
          <Typography
            variant="body1"
            color="white"
            sx={{
              maxWidth: 270,
              fontSize: 18,
              display: "inline",
              px: 2,
              mt: 5,
              backgroundColor: "#4f706c",
              borderRadius: 5,
              alignSelf: "end",
            }}
          >
            You are not joined to any group!
          </Typography>
        ) : (
          messages.map((message) => {
            return (
              <Chat
                key={message._id}
                align={message.author === logedUser.firstName ? "end" : "start"}
                color={
                  message.author === logedUser.firstName ? "#333d3c" : "#78b4ad"
                }
                secColor={
                  message.author === logedUser.firstName ? "#272b2a" : "#0b9787"
                }
                author={message.author}
                filePath={message.filePath}
                fileType={message.fileType}
                text={message.text}
                time={message.createdAt}
              />
            );
          })
        )}
      </Grid>
      <SendMessage />
    </Container>
  );
};

export default Chats;
