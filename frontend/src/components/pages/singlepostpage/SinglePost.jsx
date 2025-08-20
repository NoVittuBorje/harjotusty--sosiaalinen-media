import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
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
import Useritem from "../../Useritem";
import useGetPostComments from "../../hooks/useGetPostComments";
import useGetImageUrl from "../../hooks/useGetImageUrl";
import SinglePostImage from "./SinglePostImage";

const SinglePost = ({ match, User, refetchUser }) => {
  const id = match.params.id;
  console.log(match.params.id);
  const navigate = useNavigate();
  const [edit, editresult] = useEditPost();
  const { data, loading, error, refetchPost } = useGetPost({ id });

  const postcomments = useGetPostComments({postid:id})
  const [newcomment, result] = useMakeComment();
  const [openNewComment, setopenNewComment] = useState(false);

  const handleNewComment = async (content) => {
    console.log("new comment");
    const data = await newcomment({ postid: id, content: content.content });
    setopenNewComment(false)
    refetchUser()
  };
  const handleLike = async () => {
    console.log("likepost");
    const data = await edit({ action: "like", content: "", postid: id });
    refetchUser();
  };

  const handleDislike = async () => {
    console.log("dislikepost");
    const data = await edit({ action: "dislike", content: "", postid: id });
    console.log(data);
    refetchUser();
  };
  const NewCommentform = () => {
    if (User) {
      return (
        <Box>
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
    } else {
      return (
        <Box>
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
    }
  };
  const postdata = data ? data.getpost : [];
  const comments = postcomments.data ? postcomments.data.getpostcomments : []
  if (postdata.feed) {
    const ifimage = () => {
      if(postdata.img){
        console.log(postdata.img)
      return(
<SinglePostImage img={postdata.img}></SinglePostImage>
      )}else{return}
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
          <Grid size={{ xs: 12, md: 2 }}></Grid>
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{}}
          >
            <Box className={"postDesc"}>
              <Useritem
                time={postdata.createdAt}
                user={postdata.owner}
              ></Useritem>
              <Stack spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: 1,
                }}
              >
                
                <Typography variant="h5" sx={{ textDecoration: "underline",textDecorationThickness:1 }}>
                  {postdata.headline}
                </Typography>
                
                <Button>
                <Typography
                  color="whitesmoke"
                  variant="h8"
                  underline="none"
                  onClick={() => {navigate(`/feed/${postdata.feed.feedname}`)}}
                >{`in f/${postdata.feed.feedname}`}</Typography>
                </Button>
              </Box>
              {ifimage()}
              
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
                <NewCommentform></NewCommentform>
              </Box>
                          <Collapse in={openNewComment} timeout={"auto"} unmountOnExit>
            <CommentForm
              postid={postdata.id}
              onSubmit={(comment) => handleNewComment(comment)}
            />
          </Collapse>
          </Stack>
              <Divider></Divider>
              <CommentSection
                item={postdata.comments}
                User={User}
                comments={comments}
                loadmore={postcomments.loadmore}
                loading={postcomments.loading}
              ></CommentSection>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}></Grid>
        </Grid>
      </Box>
    );
  } else {
    <Box>loading</Box>;
  }
};

export default SinglePost;
