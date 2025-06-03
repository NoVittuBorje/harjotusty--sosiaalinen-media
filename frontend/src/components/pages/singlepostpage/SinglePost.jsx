import { Box, Divider, Grid, List, ListItem, Typography } from "@mui/material"
import Comment from "../../commentsection/Comment"
import CommentSection from "../../commentsection/CommentSection"
import useGetPost from "../../hooks/useGetPost"



const SinglePost = ({match,User}) => {
    const id = match.params.id
    console.log(match.params.id)
    const {data,loading,error,refetch} = useGetPost({id})
    console.log(data)
    if (loading) {return <Box></Box>}
    const postdata = data.getpost
    console.log(postdata)
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
                <Grid size={{xs:12, md:2}}>

                </Grid>
                <Grid size={{xs:12, md:8}} sx={{borderLeft:1,border:"solid",borderColor:"black"}}>
                    <Box className="postDesc">
                        <Typography  variant="h5" paddingLeft={2} >{postdata.headline}</Typography>
                        <Typography variant="h7">{postdata.description}</Typography>
                        <Divider></Divider>
                        <CommentSection item={postdata.comments} User={User} postid={postdata.id} ></CommentSection>
                    </Box>
                    
                    <Box>

                    </Box>
                </Grid>
                <Grid size={{xs:12, md:2}}>

                </Grid>
            </Grid>

            
        </Box>
    )
}

export default SinglePost