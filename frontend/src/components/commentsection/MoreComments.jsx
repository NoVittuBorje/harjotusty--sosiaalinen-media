import { Box, List, ListItem } from "@mui/material";
import useGetComments from "../hooks/useGetComments";
import Comment from "./Comment";
import useMakeComment from "../hooks/useMakeComment";

const MoreComments = ({ comment, User, postid }) => {
  const { data, error, loading, refetch } = useGetComments({
    commentid: comment.id,
  });
  const [newcomment, result] = useMakeComment();
  const handleDelete = (comment) => {
    console.log(comment);
  };
  const handleModify = (comment) => {
    console.log(comment);
  };
  const handleReply = ({ content, commentid }) => {
    console.log(content);
    const data = newcomment({
      postid: postid,
      content: content,
      replyto: commentid,
    });
    console.log(data);
  };
  console.log("show", comment.content);
  console.log(data);
  if (!loading) {
    const morecomments = data.getcomments[0];
    console.log(morecomments, "2");
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
