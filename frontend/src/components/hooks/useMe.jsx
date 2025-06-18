import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
const useMe = () => {
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });
  return { data: data, loading: loading, error: error, refetch: refetch };
};
export default useMe;
