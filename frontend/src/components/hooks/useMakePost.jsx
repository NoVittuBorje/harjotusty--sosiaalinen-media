import { useMutation } from '@apollo/client';
import { MAKEPOST } from '../graphql/mutations';

const useMakePost = () => {
    const [mutate, result] = useMutation(MAKEPOST)
    const make = async ({description,feedname,headline}) => {
        const data = await mutate({variables:{headline:headline,description:description,feedname:feedname}})
        return data
    }
    return [make,result]
}
export default useMakePost