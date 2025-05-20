import { useMutation } from '@apollo/client';
import { SUBSCRIBE } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';
const useSubscribe = () => {
    const [mutate, result] = useMutation(SUBSCRIBE,{refetchQueries:[GET_ME,"useMe"]})
    const sub = async ({feedname,type}) => {
        console.log(feedname,type)
        const data = await mutate({variables:{feedname:feedname,type:type}})
        return data
    }
    return [sub,result]
}

export default useSubscribe