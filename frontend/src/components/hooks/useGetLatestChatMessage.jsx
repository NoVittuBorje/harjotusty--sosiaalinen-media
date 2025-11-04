import { useSubscription } from "@apollo/client";
import { MESSAGE_SENT_PUBSUB } from "../graphql/subscriptions";


function useGetLatestChatMessage({ roomId }) {
  const { data, loading } = useSubscription(MESSAGE_SENT_PUBSUB, {
    variables: { roomId },
  });
  console.log(data)
  return {loading,data}
}
export default useGetLatestChatMessage