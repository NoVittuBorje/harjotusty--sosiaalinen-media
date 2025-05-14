import { Box, FormGroup, Grid, TextField,Button } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'
import useMakeFeed from "../hooks/useMakeFeed"
import { useNavigate } from "react-router"

const validationSchema = yup.object().shape({
    headline:yup.string(),
    text:yup.string(),
    img:yup.string(),
})
const NewPostpage = ({match}) => {
    const navigate = useNavigate()
    const handleFormSubmit = () => {
        console.log("submit post")
    }
    const formik = useFormik({
        initialValues:{
            headline:"",
            text:"",
            img:"",
        },
        onSubmit: values => {
          handleFormSubmit(values)
        },
        validationSchema
    })
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Box sx={{textAlign:"center"}}>
            <h3>{"Make post to "+match.params.postfeedname}</h3>
        </Box>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>

            <Grid size={{xs:12, md:8,}} sx={{backgroundColor:"grey"}}>
                <Box sx={{border:"solid 0.1em",borderRadius:1}}>
                    <FormGroup sx={{alignItems:"center",verticalAlign:"center",marginTop:5,}}>
                        <TextField 
                        required
                        sx={{ m: 0.5, width: "70%" }}
                        value={formik.values.headline}
                        label="Headline" variant="outlined" 
                        onChange={formik.handleChange("headline")}
                        />
                        <TextField 
                        required
                        sx={{ m: 0.5, width: "70%"}}
                        value={formik.values.text}
                        multiline
                        rows={6}
                        label="Post description" variant="filled"
                        onChange={formik.handleChange("text")}
                        />
                    <Button sx={{alignSelf:"left"}} onClick={formik.handleSubmit} variant="contained">Make post</Button>
                    </FormGroup>
                </Box>
            </Grid>

            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>

        </Grid>
        </Box>
    )
}
export default NewPostpage