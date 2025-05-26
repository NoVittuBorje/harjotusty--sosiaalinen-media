import { Box, FormGroup, Grid, TextField,Button } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'
import useMakePost from "../../hooks/useMakePost"
import { useNavigate } from "react-router"

const validationSchema = yup.object().shape({
    headline:yup.string(),
    description:yup.string(),
    img:yup.string(),
})
const NewPostpage = ({match}) => {
    const navigate = useNavigate()
    const [mutate,result] = useMakePost()
    console.log(match)
    const handleFormSubmit = async () => {
        console.log("submit post")
        const data = await mutate(formik.values)
        if(data.data.makePost){
            navigate(`/feed/${formik.values.feedname}`)
        }
    }
    const formik = useFormik({
        initialValues:{
            headline:"",
            description:"",
            feedname:match.params.postfeedname,
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
            <Grid size={{xs:12, md:2}} >

            </Grid>

            <Grid size={{xs:12, md:8,}} >
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
                        value={formik.values.description}
                        multiline
                        rows={6}
                        label="Post description" variant="filled"
                        onChange={formik.handleChange("description")}
                        />
                    <Button sx={{alignSelf:"left"}} onClick={formik.handleSubmit} variant="contained">Make post</Button>
                    </FormGroup>
                </Box>
            </Grid>

            <Grid size={{xs:12, md:2}}>

            </Grid>

        </Grid>
        </Box>
    )
}
export default NewPostpage