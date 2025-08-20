import { useQuery } from "@apollo/client"
import { GET_IMAGE_URL } from "../graphql/queries"

const useGetImageUrl = ({imageId}) => {
    const {data,loading,refetch} = useQuery(GET_IMAGE_URL,
        {variables:{imageId:imageId}},
    )
    return {data,loading,refetch}
}
export default useGetImageUrl