import { useQuery } from "@apollo/client"
import { GET_IMAGE_URLS } from "../graphql/queries"

const useGetImageUrls = ({userid}) => {
    const {data,loading,refetch} = useQuery(GET_IMAGE_URLS,
        {variables:{userId:userid}},
    )
    return {data,loading,refetch}
}
export default useGetImageUrls