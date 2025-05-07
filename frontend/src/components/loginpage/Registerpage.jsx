import { Box ,Grid} from "@mui/material"


const RegisterPage = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>

            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>

            <Grid size={{xs:12, md:8}} sx={{}}>

            </Grid>

            <Grid size={{xs:12, md:2}} sx={{}}>
                
            </Grid>

        </Grid>
        </Box>
    )
}
export default RegisterPage