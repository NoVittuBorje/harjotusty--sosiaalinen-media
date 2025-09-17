import { Box } from "@mui/material"
import useGetImageUrl from "../../hooks/useGetImageUrl"

const SinglePostImage = ({img}) => {
    const {data,loading} = useGetImageUrl({imageId:img})
    if(!loading){
        console.log(data)
    return(
        <img src={data.getImage} style={{maxWidth:"100%",}}></img>
    )}
}
export default SinglePostImage