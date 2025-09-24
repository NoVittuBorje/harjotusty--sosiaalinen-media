import { useMutation } from "@apollo/client";
import { DISLIKEPOST } from "../graphql/mutations";

const useDislikePost = () => {
  const [mutate, result] = useMutation(DISLIKEPOST);
  const edit = async ({id}) => {
    const data = await mutate({
        variables:{
            dislikePostId:id
        }
    });
    return data;
  };
  return [edit, result];
};
export default useDislikePost;
