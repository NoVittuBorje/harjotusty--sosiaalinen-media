import { useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "../graphql/queries";
import { MESSAGE_SENT_PUBSUB } from "../graphql/subscriptions";
import { useEffect } from "react";


function ChatMessageData({ roomId }) {
  const { subscribeToMore, ...result } = useQuery(GET_CHAT_MESSAGES, {
    variables: { roomId: roomId },
  });

  useEffect(() => {
    if (result.data) {
        console.log(result.data)
      const unsubscribe = subscribeToMore({
        document: MESSAGE_SENT_PUBSUB,
        variables: { roomId: roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.messageSent;
          console.log(prev)
          return Object.assign({}, prev, {
            getMessages: {
              messages: [newFeedItem, ...prev.getMessages],
            },
          });
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [result, roomId,subscribeToMore]);

  return {...result};
}
export default ChatMessageData