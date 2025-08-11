import { useQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "../graphql/queries";
const useGetPostComments = ({ postid }) => {
  const { data, error, loading, refetch, fetchMore,...result } = useQuery(GET_POST_COMMENTS,
    { variables: { postid: postid, offset:0 ,limit:10} },
  );
  const handleFetchMore = ({offset}) => {
    fetchMore({
      variables: {
        postid: postid,
        limit:10,
        offset:offset
      },
    });
  };
  return { data: data, loading: loading, error: error, refetchPostComment: refetch,fetchMore: handleFetchMore,...result };
};
export default useGetPostComments;