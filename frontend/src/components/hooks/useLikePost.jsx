import { useMutation } from "@apollo/client";

import { LIKEPOST } from "../graphql/mutations";

const useLikePost = () => {
  const [mutate, result] = useMutation(LIKEPOST);
  const edit = async ({id}) => {
    const data = await mutate({
        variables:{
            likePostId:id
        }
    });
    return data;
  };
  return [edit, result];
};
export default useLikePost;