import { useState, useContext } from "react";

import {
  TextField,
  Input,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { LoginContext } from "../../../state/LoginContext";
import { CurrentGroupContext } from "../../../state/CurrentGroupContext";
import { MessageContext } from "../../../state/MessageContext";

import { sendMessage } from "../../../api/index";
import checkLogedUser from "../../../utils/checkLogedUser";
const SendMessage = () => {
  //////////////////

  //////////////////
  const [logedUser, setLogedUser] = useContext(LoginContext);
  const [currentGroup, setCurrentGroup] = useContext(CurrentGroupContext);
  const [messages, setMessages] = useContext(MessageContext);
  const [message, setMessage] = useState({
    text: "",
    file: "",
  });
  const [uploadedFile, setUploadedFile] = useState({});
  const TextHandleChange = (e) => {
    setMessage({ ...message, text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("std-profile"))?.token;
    let formData = new FormData();
    formData.append("file", message.file);
    formData.append("text", message.text);
    formData.append("author", logedUser?.firstName);
    formData.append("groupName", currentGroup?.name);
    setMessage({ text: "", file: "" });
    const result = await sendMessage(formData, token);
    setMessages([...messages, result]);
  };
  return (
    <Container
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: "100vw",
        pl: 0,
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
      <form
        id="SMForm"
        onSubmit={handleSubmit}
        // method="post"
        // encType="multipart/form-data"
        // action="http://localhost:9010/chat/sendmessage"
      >
        <TextField
          autoComplete="off"
          fullWidth
          size="small"
          sx={[
            {
              backgroundColor: "gray",
              borderRadius: "15px",
              border: "hidden",
            },
          ]}
          name="text"
          type="text"
          value={message.text}
          onChange={TextHandleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <label
                  style={{
                    cursor: "pointer",
                    padding: "12px 15px",
                    position: "fixed",
                    width: "10px",
                    height: "10px",
                    zIndex: 1000,
                  }}
                >
                  <Input
                    multiple={false}
                    sx={{
                      display: "none",
                    }}
                    name="file"
                    type="file"
                    onChange={(e) => {
                      setMessage((prev) => ({
                        ...message,
                        file: e.target.files[0],
                      }));
                    }}
                  />
                </label>
                <IconButton>
                  <AttachmentOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{}}>
                <IconButton
                  disabled={
                    currentGroup?.name === undefined
                      ? true
                      : checkLogedUser() === false
                      ? true
                      : false
                  }
                  type="submit"
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Container>
  );
};

export default SendMessage;
