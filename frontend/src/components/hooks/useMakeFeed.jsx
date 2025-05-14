import { useMutation } from '@apollo/client';
import { MAKEFEED } from '../graphql/mutations';

const useMakeFeed = () => {
    const [mutate, result] = useMutation(MAKEFEED)
    const make = async ({description,feedname}) => {
        const data = await mutate({variables:{description:description,feedname:feedname}})
        return data
    }
    return [make,result]
}
export default useMakeFeed