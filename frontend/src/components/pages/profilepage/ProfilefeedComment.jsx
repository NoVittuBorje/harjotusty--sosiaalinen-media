import { Box,} from "@mui/material";
import useGetUserComments from "../../hooks/useGetUserComments";
import CommentSection from "../../commentsection/CommentSection";

const ProfileFeedComment = ({variables,User,userdata,setmessage,setseverity}) => {
  console.log(variables);
  const comments = useGetUserComments(variables);
  const loadmore = () => {
    comments.fetchMore({ offset: comments.data.getusercomments.length });
  };
  if (comments.loading) {
    return <Box>loading</Box>;
  }
  console.log(comments.data.getusercomments);
  let ecomments = comments.data.getusercomments.map((comment) =>{ console.log(comment)
    if(!comment.replyto){
    return({...comment,user:userdata})}else{
      sessionStorage.setItem(comment.replyto.id,true)
      return({...comment.replyto,replies:{...comment}})
    }
  })
  console.log(ecomments)
  return (
    <Box sx={{}}>
      
      <CommentSection User={User}             setmessage={setmessage}
            setseverity={setseverity} comments={ecomments} loadmore={loadmore} loading={comments.loading} type={"profile"}></CommentSection>
    </Box>
  );
};

export default ProfileFeedComment;
