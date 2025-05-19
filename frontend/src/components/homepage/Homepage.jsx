import { Box, Divider, Grid, List, } from "@mui/material"

import FeedItem from "./FeedItem";

const Homescreen = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>
            <Grid size={{xs:12, md:8}} sx={{backgroundColor:"grey"}}>
                <h3 style={{textAlign:"center"}}>Popular Feed</h3>
                <Divider></Divider>
                    <List>
                    </List>
            </Grid>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>
        </Grid>
        </Box>
    )
}
export default Homescreen