import { Box, Grid } from "@mui/material"

const MyAccountpage = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:4}} sx={{backgroundColor:"grey"}}>

            </Grid>

            <Grid size={{xs:12, md:4}} sx={{backgroundColor:"grey"}}>
                <Box sx={{textAlign:"center"}}>
                    <h3>My account</h3>
                </Box>
            </Grid>

            <Grid size={{xs:12, md:4}} sx={{backgroundColor:"grey"}}>

            </Grid>

        </Grid>
        </Box>
    )
}
export default MyAccountpage