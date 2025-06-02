import { useQuery } from '@apollo/client';
import { GET_COMMENTS} from '../graphql/queries';
const useGetComments = ({commentid}) =>{
const { data, error, loading,refetch } = useQuery(GET_COMMENTS,{variables:{id:commentid}}, {
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-first',
})
    return { data:data, loading:loading,error:error,refetch:refetch};
}
export default useGetComments