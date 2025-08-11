import { useQuery } from "@apollo/client";
import { GET_POST, GET_POST_MIN } from "../graphql/queries";
const useGetPost = ({ id }) => {
  const { data, error, loading, refetch } = useQuery(
    GET_POST_MIN,
    { variables: { getpostId: id } },
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "network-only",
    }
  );
  return { data: data, loading: loading, error: error, refetchPost: refetch };
};
export default useGetPost;
