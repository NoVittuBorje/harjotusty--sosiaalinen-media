import { useQuery } from "@apollo/client";
import { GET_FEED_POSTS } from "../graphql/queries";
const useGetFeedPosts = ({ feedname }) => {
  const { data, error, loading, refetch, fetchMore,...result } = useQuery(GET_FEED_POSTS,
    { variables: { feedname: feedname, offset:0 ,limit:10} },
  );
  const handleFetchMore = ({offset}) => {
    fetchMore({
      variables: {
        feedname: feedname,
        limit:10,
        offset:offset
      },
    });
  };
  return { data: data, loading: loading, error: error, refetch: refetch,fetchMore: handleFetchMore,...result };
};
export default useGetFeedPosts;