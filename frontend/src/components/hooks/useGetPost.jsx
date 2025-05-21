import { useQuery } from "@apollo/client";
import { GET_POST} from '../graphql/queries';
const useGetPost = ({id}) =>{
    const { data, error, loading,refetch } = useQuery(GET_POST,{variables:{getpostId:id}}, {
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-first',
})
    console.log(id)
    return { data:data, loading:loading,error:error,refetch:refetch};
}
export default useGetPost