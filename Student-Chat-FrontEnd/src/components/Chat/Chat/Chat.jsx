import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";

import cardAudio from "../../../images/audio.png";
import cardDocs from "../../../images/docs.png";

import { saveAs } from "file-saver";

const Chat = ({
  author,
  text,
  filePath,
  fileType,
  time,
  align,
  color,
  secColor,
}) => {
  let textColor = "text.primary";
  let secTextColor = "text.secondary";
  if (secColor !== "#0b9787") {
    textColor = "white";
    secTextColor = "#b3b3b3";
  }
  time = moment(time).fromNow();

  return (
    <Grid
      item
      sx={{
        mt: 1,
        maxWidth: 250,
        alignSelf: align,
        mr: 2,
        ml: {
          sm: 39,
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 250,
          px: 1,
          backgroundColor: color,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "inline",
              backgroundColor: secColor,
              borderRadius: 5,
              mt: 0.5,
              ml: -0.6,
              px: 0.7,
              pb: 0.2,
              color: "white",
            }}
          >
            {author}
          </Typography>
          {filePath !== "" && (
            <Typography
              alignSelf="center"
              variant="subtitle1"
              color={textColor}
            >
              {fileType}
            </Typography>
          )}
        </Box>
        {filePath !== "" && (
          <CardMedia
            component={
              fileType === "Document"
                ? "img"
                : fileType === "audio"
                ? "img"
                : fileType
            }
            height="130"
            width="200"
            src={
              fileType === "audio"
                ? `${cardAudio}`
                : fileType === "Document"
                ? `${cardDocs}`
                : `${process.env.REACT_APP_BASE_URL}${filePath}`
            }
            alt="Attached File"
            sx={{
              mt: 0.5,
              mb: 0.5,
            }}
          />
        )}
        <CardContent>
          <Typography
            variant="body1"
            color={textColor}
            sx={{
              mt: -2,
              mx: -1,
              mb: -2,
            }}
          >
            {text}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {filePath !== "" && (
            <CardActions>
              <IconButton
                onClick={() => {
                  const toSaveFile = filePath.replace("message/images/", "");
                  saveAs(
                    `${process.env.REACT_APP_BASE_URL}${filePath}`,
                    toSaveFile
                  );
                }}
                sx={{
                  ml: -1,
                  mt: -1,
                }}
              >
                <DownloadIcon
                  sx={{
                    cursor: "pointer",
                    color: textColor,
                  }}
                />
              </IconButton>
            </CardActions>
          )}

          <Typography alignSelf="center" variant="caption" color={secTextColor}>
            {time}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default Chat;
