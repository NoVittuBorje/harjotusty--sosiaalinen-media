import { useQuery } from "@apollo/client";
import { GET_POST, GET_POST_MIN } from "../graphql/queries";
const useGetPost = ({ id }) => {
  const { data, error, loading, refetch } = useQuery(
    GET_POST_MIN,
    { variables: { getpostId: id } },
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "ntwork-only",
    }
  );
  console.log(id);
  return { data: data, loading: loading, error: error, refetch: refetch };
};
export default useGetPost;
