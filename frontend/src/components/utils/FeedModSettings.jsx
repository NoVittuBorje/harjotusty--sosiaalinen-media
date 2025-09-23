import { Box, Button, Stack, Typography } from "@mui/material"

const FeedModSettings = ({item}) => {
    return(
        <Box sx={{display:"flex",justifyContent:"center",justifyItems:"center"}}>
        <Stack direction={"column"} sx={{justifyContent:"center",justifyItems:"center"}}>
        <Typography>Mod settings:</Typography>
        <Button className="button" sx={{borderRadius:50}} size="small" variant="outlined" color="inherit">Edit feed description</Button>
        </Stack>
      </Box>
    )
}
export default FeedModSettings