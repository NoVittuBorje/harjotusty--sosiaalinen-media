import { useMutation } from "@apollo/client";

import { LIKECOMMENT } from "../graphql/mutations";

const useLikeComment = () => {
  const [mutate, result] = useMutation(LIKECOMMENT);
  const edit = async ({id}) => {
    const data = await mutate({
        variables:{
            likeCommentId:id
        }
    });
    return data;
  };
  return [edit, result];
};
export default useLikeComment;