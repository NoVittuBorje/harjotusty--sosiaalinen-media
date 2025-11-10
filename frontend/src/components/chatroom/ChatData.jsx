import { useQuery, useSubscription } from "@apollo/client";
import { GET_CHAT_MESSAGES_FOR_ROOM } from "../graphql/queries";
import { MESSAGE_SENT_PUBSUB } from "../graphql/subscriptions";
import { useEffect } from "react";


function ChatMessageData({ roomId }) {
  const { subscribeToMore, ...result } = useQuery(GET_CHAT_MESSAGES_FOR_ROOM, {
    variables: { roomId: roomId },
  });
  

  useEffect(() => {
    if (result.data) {
      const unsubscribe = subscribeToMore({
        document: MESSAGE_SENT_PUBSUB,
        variables: { roomId: roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log(subscriptionData.data.messageSent,"subdata")
          console.log(prev.getMessagesForRoom.messages,"prev data")
          
          const newFeedItem = subscriptionData.data.messageSent;
          console.log([newFeedItem,...prev.getMessagesForRoom.messages])
          const newmessages = [newFeedItem,...prev.getMessagesForRoom.messages]
          return Object.assign({}, prev, {
            getMessagesForRoom: {
              messages: newmessages,
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