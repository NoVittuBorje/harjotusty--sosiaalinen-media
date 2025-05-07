import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
const useMe = () =>{
    const token = localStorage.getItem("token")
    const { data, error, loading, refetch } = useQuery(GET_ME,{headers: {authorization: token ? `Bearer ${token}` : ""}});
    return { data:data, loading:loading,error:error,refetch:refetch};

}
export default useMe