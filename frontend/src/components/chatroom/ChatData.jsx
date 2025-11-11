import { useQuery, useSubscription } from "@apollo/client";
import { GET_CHAT_MESSAGES, GET_CHAT_MESSAGES_FOR_ROOM } from "../graphql/queries";
import { MESSAGE_SENT_PUBSUB } from "../graphql/subscriptions";
import { useEffect } from "react";


function ChatMessageData({ roomId }) {
  const { subscribeToMore, fetchMore,...result } = useQuery(GET_CHAT_MESSAGES, {
    variables: { roomId: roomId,offset:0 },
  });
  const handleFetchMore = ({ offset }) => {
    fetchMore({
      variables: {
        roomId:roomId,
        offset: offset,
      },
    });
  };

  useEffect(() => {
    if (result.data) {
      const unsubscribe = subscribeToMore({
        document: MESSAGE_SENT_PUBSUB,
        variables: { roomId: roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log(subscriptionData.data.messageSent,"subdata")
          console.log(prev.getMessages,"prev data")
          
          const newFeedItem = [subscriptionData.data.messageSent,...prev.getMessages]
          console.log([...prev.getMessages,subscriptionData.data.messageSent])
          const newmessages = Object.assign({}, prev, {
            getMessages: newFeedItem,
            
          });
          console.log(newmessages)
          return newmessages
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [result, roomId,subscribeToMore]);

  return {handleFetchMore,...result};
}
export default ChatMessageData