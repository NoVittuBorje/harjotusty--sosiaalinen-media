import { EDITCHATROOM } from "../graphql/mutations";
import { useMutation } from "@apollo/client";


const useEditChatRoom = () => {
  const [mutate, result] = useMutation(EDITCHATROOM);
  const editroom = async ({ roomId, type, feedId }) => {

    const data = await mutate({
        variables: { roomId: roomId, type: type, feedId: feedId },
    });
      return data;
    }
  return [editroom, result];
};
export default useEditChatRoom;
