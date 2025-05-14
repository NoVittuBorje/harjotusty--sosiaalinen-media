import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
const useMe = () =>{
    const { data, error, loading,refetch } = useQuery(GET_ME)
    console.log(localStorage.getItem("token"))
    return { data:data, loading:loading,error:error,refetch:refetch};

}
export default useMe