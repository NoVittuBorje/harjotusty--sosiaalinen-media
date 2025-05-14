import { Box, Button, Grid } from "@mui/material"
import useGetFeed from "../hooks/useGetFeed"
import { useNavigate } from "react-router"

const FeedPage = ({match}) => {
    console.log(match.params.feedname)
    const feedname = match.params.feedname
    const navigate = useNavigate()
    const {data,loading,error,refetch} = useGetFeed({feedname})
    console.log(data,loading,error)
    if (loading){
        return(<Box>Loading ...</Box>)
    }else{
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Box sx={{textAlign:"center"}}>
            <h3>{}</h3>
        </Box>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:4}} sx={{backgroundColor:"grey"}}>

            </Grid>

            <Grid size={{xs:12, md:4}} sx={{backgroundColor:"grey"}}>

            </Grid>

            <Grid size={{xs:12, md:4}} sx={{backgroundColor:"grey"}}>
                <Button onClick={() => {navigate(`/newpost/${feedname}`)}}>Make new Post</Button>
            </Grid>

        </Grid>
        </Box>
    )
}
}
export default FeedPage