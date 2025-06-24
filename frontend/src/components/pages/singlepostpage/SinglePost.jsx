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
import useEditPost from "../../hooks/useEditPost";


const SinglePost = ({ match, User ,refetchUser}) => {
  const id = match.params.id;
  console.log(match.params.id);
  const navigate = useNavigate();
  const [edit,editresult] = useEditPost()
  const { data, loading, error, refetch } = useGetPost({ id });
  const [newcomment, result] = useMakeComment();
  const [openNewComment, setopenNewComment] = useState(false);
  if (loading) {
    return <Box>..loading</Box>;
  }else{

  const handleNewComment = async (content) => {
    console.log("new comment");
    const data = await newcomment({ postid: id, content: content.content });
  };
  const handleLike = async () => {
    console.log("likepost");
    const data = await edit({action:"like",content:"",postid:id})
    refetchUser()
  };
  const handleDislike = async () => {
    console.log("dislikepost");
    const data = await edit({action:"dislike",content:"",postid:id})
    console.log(data)
    refetchUser()
  };
  const postdata = data ? data.getpost : [];
  if(postdata){
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
                id={postdata.id}
                User={User}
                likes={User ? User.likedposts : []}
                dislikes={User ? User.dislikedposts : []}
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
              refetchUser={refetchUser}
              item={postdata.comments}
              User={User}
              refetch={refetch}
              postid={postdata.id}
            ></CommentSection>
          </Box>

          <Box></Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
      </Grid>
    </Box>
  );
}else{
  <Box>loading</Box>
}
  }
};

export default SinglePost;
