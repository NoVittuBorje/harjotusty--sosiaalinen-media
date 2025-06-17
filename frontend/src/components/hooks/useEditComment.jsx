import { useMutation } from "@apollo/client";
import { EDITCOMMENT } from "../graphql/mutations";

const useEditComment = () => {
  const [mutate, result] = useMutation(EDITCOMMENT);
  const edit = async ({commentid,content,action}) => {
    const data = await mutate({
        variables:{
            commentid:commentid,
            content:content,
            action:action}
    });
    return data;
  };
  return [edit, result];
};
export default useEditComment;