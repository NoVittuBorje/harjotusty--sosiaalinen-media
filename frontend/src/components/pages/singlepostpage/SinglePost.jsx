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
import CommentForm from "./CommentForm";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useState } from "react";
import KarmaItem from "../../KarmaItem";
import { useNavigate } from "react-router";
import useEditPost from "../../hooks/useEditPost";
import Useritem from "../../Useritem";
import useGetPostComments from "../../hooks/useGetPostComments";
import SinglePostImage from "./SinglePostImage";
import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const SinglePost = ({ match, User, refetchUser }) => {
  const id = match.params.id;
  console.log(match.params.id);
  const navigate = useNavigate();
  const [edit, editresult] = useEditPost();
  const { data, loading, error, refetchPost } = useGetPost({ id });

  const postcomments = useGetPostComments({ postid: id });
  const [newcomment, result] = useMakeComment();
  const [openNewComment, setopenNewComment] = useState(false);
  const [OpenSettings, setOpenSettings] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNewComment = async (content) => {
    console.log("new comment");
    const data = await newcomment({ postid: id, content: content.content });
    setopenNewComment(false);
    postcomments.refetchPostComment()
  };
  const handleLike = async () => {
    console.log("like post");
    const data = await edit({ action: "like", content: "", postid: id });
    refetchUser();
  };
  const handleDelete = async () => {
    console.log("delete post");

    const data = await edit({action: "delete", content:"", postid:id})
    console.log(data)
    refetchPost()
    handleClose()
    navigate(-1)
  };

  const handleDislike = async () => {
    console.log("dislikepost");
    const data = await edit({ action: "dislike", content: "", postid: id });
    console.log(data);
    refetchUser();
  };
  const LeftPadding = () => {
    return
  }
  const PostSettings = ({info}) => {
    console.log(info)
    if(!User){return}
      const DeletePost = () => {
    return(
      <Stack padding={1}>
              <Dialog
              open={open}
              onClose={handleClose}
              >
              <DialogTitle>{"Are you sure you want to delete post?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This action is irreversible
                </DialogContentText>
              </DialogContent>
                      <DialogActions>
          <Button variant="outlined" color=""  sx={{borderRadius:50}} onClick={handleClose}>No</Button>
          <Button variant="outlined" color=""  sx={{borderRadius:50}} onClick={() => {handleDelete();handleClose()}}>
            Yes
          </Button>
        </DialogActions>
              </Dialog>
              <Button variant="outlined" color="" className={"button"} sx={{borderRadius:50}} onClick={handleClickOpen}>Delete post</Button>
            </Stack>
    )
  }
    if (!OpenSettings & info.owner.username == User.username) {
      return (
        <IconButton onClick={() => setOpenSettings(!OpenSettings)}>
          <SettingsIcon></SettingsIcon>
        </IconButton>
      );
    } else {
      
      return (
        <Collapse in={OpenSettings}>
          <Box>
            <IconButton onClick={() => setOpenSettings(!OpenSettings)}>
              <SettingsIcon></SettingsIcon>
            </IconButton>
            
            <DeletePost></DeletePost>
          </Box>
        </Collapse>
      );
    }
  };
  const NewCommentform = () => {
    if (User) {
      return (
        <Box>
          <Tooltip title="New comment">
            <IconButton
              className={"button"}
              onClick={() => {
                setopenNewComment(!openNewComment)
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
  const comments = postcomments.data ? postcomments.data.getpostcomments : [];
  if (postdata.feed) {
    const ifimage = () => {
      if (postdata.img) {
        console.log(postdata.img);
        return <SinglePostImage img={postdata.img}></SinglePostImage>;
      } else {
        return;
      }
    };
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
          <Grid size={{ xs: 12, md: 2 }}>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} sx={{}}>
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
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: "underline",
                      textDecorationThickness: 1,
                    }}
                  >
                    {postdata.headline}
                  </Typography>

                  <Button>
                    <Typography
                      color="whitesmoke"
                      variant="h8"
                      underline="none"
                      onClick={() => {
                        navigate(`/feed/${postdata.feed.feedname}`);
                      }}
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
          <Grid size={{ xs: 12, md: 2 }}>
            <PostSettings info={postdata}></PostSettings>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    <Box>loading</Box>;
  }
};

export default SinglePost;
