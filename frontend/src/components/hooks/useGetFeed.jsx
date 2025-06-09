import { useQuery } from "@apollo/client";
import { GET_FEED } from "../graphql/queries";
const useGetFeed = ({ feedname }) => {
  const { data, error, loading, refetch } = useQuery(
    GET_FEED,
    { variables: { feedname: feedname, querytype: "single" } },
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    }
  );
  return { data: data, loading: loading, error: error, refetch: refetch };
};
export default useGetFeed;
