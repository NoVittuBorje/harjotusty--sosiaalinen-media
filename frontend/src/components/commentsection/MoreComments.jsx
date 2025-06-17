import { Box, List, ListItem } from "@mui/material";
import useGetComments from "../hooks/useGetComments";
import Comment from "./Comment";
import useMakeComment from "../hooks/useMakeComment";

const MoreComments = ({ comment, User, postid,handleModify,handleDelete,handleReply }) => {
  const { data, error, loading, refetch } = useGetComments({
    commentid: comment.id,
  });
  if (!loading) {
    const morecomments = data.getcomments[0];
    return (
      <List>
        {morecomments.replies.map((reply) => (
          <ListItem key={reply.id}>
            <Comment
              comment={reply}
              User={User}
              handleReply={handleReply}
              handleDelete={handleDelete}
              handleModify={handleModify}
            />
          </ListItem>
        ))}
      </List>
    );
  } else {
    return <Box>...loading</Box>;
  }
};

export default MoreComments;
