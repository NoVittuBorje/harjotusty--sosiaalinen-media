import { Box, FormGroup, Grid, TextField,Button } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'
import useMakeFeed from "../hooks/useMakeFeed"
import { useNavigate } from "react-router"
const validationSchema = yup.object().shape({
    feedname:yup.string().min(1).required(),
    description:yup.string().min(1).required(),
})
const MakeFeedPage = () => {
    const [make,result] = useMakeFeed()
    const navigate = useNavigate()
    const handleFormSubmit = async () => {
        console.log("submit")
        const data = await make(formik.values)
        console.log(data)
        if (data.data.makefeed){
            navigate(`/feed/${data.data.makefeed}`)
        }
    }
    const formik = useFormik({
        initialValues:{
            feedname:"",
            description:"",
        },
        onSubmit: values => {
          handleFormSubmit(values)
        },
        validationSchema
    })
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{textAlign:"center"}}>
                <h3>Make new feed</h3>
            </Box>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>

            <Grid size={{xs:12, md:2}}>

            </Grid>

            <Grid size={{xs:12, md:8}} >
                <Box sx={{border:"solid 0.1em",borderRadius:1}}>
                    <FormGroup sx={{alignItems:"center",verticalAlign:"center",marginTop:5,}}>
                        
                        <TextField 
                        required
                        sx={{ m: 0.5, width: "30%" }}
                        value={formik.values.feedname}
                        label="Feed name" variant="outlined" 
                        onChange={formik.handleChange("feedname")}
                        />
                        <TextField 
                        required
                        sx={{ m: 0.5, width: "70%"}}
                        value={formik.values.description}
                        multiline
                        rows={6}
                        label="Description" variant="filled"
                        onChange={formik.handleChange("description")}
                        />
                    <Button sx={{alignSelf:"left"}} onClick={formik.handleSubmit} variant="contained">Make feed</Button>
                    </FormGroup>
                </Box>
            </Grid>

            <Grid size={{xs:12, md:2}}>

            </Grid>

        </Grid>

        </Box>
    )
}
export default MakeFeedPage