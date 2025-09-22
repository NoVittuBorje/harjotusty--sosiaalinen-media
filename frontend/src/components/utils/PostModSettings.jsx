import { Box, Button, Stack, Typography } from "@mui/material"

const PostModSettings = ({item}) => {
    console.log("on mod")
    return(
        <Box sx={{display:"flex",justifyContent:"center",justifyItems:"center"}}>
        <Stack direction={"column"} sx={{justifyContent:"center",justifyItems:"center"}}>
        <Typography>Mod settings:</Typography>
        <Button className="button" sx={{borderRadius:50}} size="small" variant="outlined" color="inherit">Ban poster</Button>
        <Button className="button" sx={{borderRadius:50}} size="small" variant="outlined" color="inherit">Delete post</Button>
        <Button className="button" sx={{borderRadius:50}} size="small" variant="outlined" color="inherit">Lock post</Button>
        </Stack>
      </Box>
    )
}
export default PostModSettings