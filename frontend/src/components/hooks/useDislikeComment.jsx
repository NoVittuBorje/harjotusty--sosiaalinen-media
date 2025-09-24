import { useMutation } from "@apollo/client";
import { DISLIKECOMMENT } from "../graphql/mutations";


const useDislikeComment = () => {
  const [mutate, result] = useMutation(DISLIKECOMMENT);
  const edit = async ({id}) => {
    const data = await mutate({
        variables:{
            dislikeCommentId:id
        }
    });
    return data;
  };
  return [edit, result];
};
export default useDislikeComment;