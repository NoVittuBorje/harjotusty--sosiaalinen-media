import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useNavigate } from "react-router";

const KarmaItem = ({ handleDislike, handleLike, karma, User }) => {
  const navigate = useNavigate();
  if (!User) {
    return (
      <Box className={"footerkarma"}>
        <Tooltip title="Login to like">
          <IconButton
            className={"button"}
            onClick={() => navigate("/login")}
            size="small"
          >
            <ArrowUpwardRoundedIcon
              style={{ color: "green" }}
            ></ArrowUpwardRoundedIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="karma">
          <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
        </Tooltip>
        <Tooltip title="Login to dislike">
          <IconButton className={"button"} onClick={handleDislike} size="small">
            <ArrowDownwardRoundedIcon
              style={{ color: "red" }}
            ></ArrowDownwardRoundedIcon>
          </IconButton>
        </Tooltip>
      </Box>
    );
  }
  return (
    <Box className={"footerkarma"}>
      <Tooltip title="Like">
        <IconButton className={"button"} onClick={handleLike} size="small">
          <ArrowUpwardRoundedIcon
            style={{ color: "green" }}
          ></ArrowUpwardRoundedIcon>
        </IconButton>
      </Tooltip>
      <Tooltip title="karma">
        <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
      </Tooltip>
      <Tooltip title="Dislike">
        <IconButton className={"button"} onClick={handleDislike} size="small">
          <ArrowDownwardRoundedIcon
            style={{ color: "red" }}
          ></ArrowDownwardRoundedIcon>
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default KarmaItem;
