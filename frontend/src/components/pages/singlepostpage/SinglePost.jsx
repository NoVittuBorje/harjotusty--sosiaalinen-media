import {
  Box,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Comment from "../../commentsection/Comment";
import CommentSection from "../../commentsection/CommentSection";
import useGetPost from "../../hooks/useGetPost";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import useMakeComment from "../../hooks/useMakeComment";
import CommentForm from "../../commentsection/CommentForm";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useState } from "react";
import KarmaItem from "../../KarmaItem";
import { useNavigate } from "react-router";

const SinglePost = ({ match, User }) => {
  const id = match.params.id;
  console.log(match.params.id);
  const navigate = useNavigate();
  
  const [newcomment, result] = useMakeComment();
  const { data, loading, error, refetch } = useGetPost({ id });
  const [openNewComment, setopenNewComment] = useState(false);
  if (loading) {
    return <Box></Box>;
  }else{
  let postdata = data.getpost
  const handleNewComment = (content) => {
    console.log("new comment");
    const data = newcomment({ postid: postdata.id, content: content.content });
    console.log(data);
    refetch()
  };
  const NewComment = () => {
    if (!User) {
      return (
        <Box className={"footer"}>
          <KarmaItem
            handleDislike={handleDislike}
            handleLike={handleLike}
            User={User}
            karma={postdata.karma}
          ></KarmaItem>
          <Tooltip title="Login to comment">
            <IconButton
              className={"button"}
              onClick={() => {
                navigate("/login");
              }}
            >
              <AddCommentIcon style={{ color: "white" }}></AddCommentIcon>
            </IconButton>
          </Tooltip>
        </Box>
      );
    } else {
      return (
        <Box className={"footer"}>
          <KarmaItem
            handleDislike={handleDislike}
            handleLike={handleLike}
            User={User}
            karma={postdata.karma}
          ></KarmaItem>
          <Tooltip title="New comment">
            <IconButton
              className={"button"}
              onClick={() => {
                if (openNewComment == false) {
                  setopenNewComment(true);
                } else {
                  setopenNewComment(false);
                }
              }}
            >
              <AddCommentIcon style={{ color: "white" }}></AddCommentIcon>
            </IconButton>
          </Tooltip>
        </Box>
      );
    }
  };
  const handleLike = () => {
    console.log("likepost");
  };
  const handleDislike = () => {
    console.log("dislikepost");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{ borderLeft: 1, border: "solid", borderColor: "black" }}
        >
          <Box className={"postDesc"}>
            <Typography variant="h5" sx={{ textDecoration: "underline" }}>
              {postdata.headline}
            </Typography>
            <Typography variant="h7">{postdata.description}</Typography>
            <Box className={"footer"}>
              <KarmaItem
                handleDislike={handleDislike}
                handleLike={handleLike}
                User={User}
                karma={postdata.karma}
              ></KarmaItem>
              <Tooltip title="New comment">
                <IconButton
                  className={"button"}
                  onClick={() => {
                    if (openNewComment == false) {
                      setopenNewComment(true);
                    } else {
                      setopenNewComment(false);
                    }
                  }}
                >
                  <AddCommentIcon style={{ color: "white" }}></AddCommentIcon>
                </IconButton>
              </Tooltip>
            </Box>
            <Collapse in={openNewComment} timeout={"auto"} unmountOnExit>
              <CommentForm
                postid={postdata.id}
                onSubmit={(comment) => handleNewComment(comment)}
              />
            </Collapse>
            <Divider></Divider>
            <CommentSection
              item={postdata.comments}
              refetch={refetch}
              User={User}
              postid={postdata.id}
            ></CommentSection>
          </Box>

          <Box></Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
      </Grid>
    </Box>
  );
  }
};

export default SinglePost;
