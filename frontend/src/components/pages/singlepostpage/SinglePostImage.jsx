import { Box } from "@mui/material"
import useGetImageUrl from "../../hooks/useGetImageUrl"

const SinglePostImage = ({img}) => {
    const {data,loading} = useGetImageUrl({imageId:img})
    if(!loading){
        console.log(data)
    return(
        <img src={data.getImage} style={{maxWidth:"80%",borderRadius:5,marginLeft:"5%"}}></img>
    )}
}
export default SinglePostImage