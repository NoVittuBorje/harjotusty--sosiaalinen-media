import { Box, FormGroup, Grid, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMakePost from "../../hooks/useMakePost";
import { useNavigate } from "react-router";
import FileUpload from "../../utils/upload";
import useGetImageUrls from "../../hooks/useGetImageUrl";
import { useState } from "react";

const validationSchema = yup.object().shape({
  headline: yup.string(),
  description: yup.string(),
});
const NewPostpage = ({ match,User }) => {
  const navigate = useNavigate();

  const [mutate, result] = useMakePost();
  const [imagepath,setImagePath] = useState("")
  const handleFormSubmit = async () => {
    console.log("submit post");
    const data = await mutate({...formik.values,img:imagepath[0]});
    if (data.data.makePost) {
      navigate(`/post/${data.data.makePost.id}`);
    }
  };
  const Uploadedimages = () => {
    if(imagepath.length != 0){
    return(
      <Typography>{imagepath[1]}</Typography>
    )}
  }
  const formik = useFormik({
    initialValues: {
      headline: "",
      description: "",
      feedname: match.params.postfeedname,
    },
    onSubmit: (values) => {
      handleFormSubmit(values,imagepath);
    },
    validationSchema,
  });
  console.log(formik.values)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <h3>{"Make post to " + match.params.postfeedname}</h3>
        
      </Box>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ border: "solid 0.1em", borderRadius: 1 }}>
            <Box sx={{display:"flex",justifyContent:"center", borderBottom:1,}}>
            <FileUpload setImagePath={setImagePath} userid={User.id}></FileUpload>
            {Uploadedimages()}
            </Box>
            <FormGroup
              sx={{
                alignItems: "center",
                verticalAlign: "center",
                marginTop: 5,
              }}
            >
              <TextField
                required
                sx={{ m: 0.5, width: "70%" }}
                value={formik.values.headline}
                label="Headline"
                variant="outlined"
                inputProps={{ style: { color: "white" } }}
                onChange={formik.handleChange("headline")}
              />
              <TextField
                required
                sx={{ m: 0.5, width: "70%" }}
                value={formik.values.description}
                multiline
                rows={6}
                inputProps={{ style: { color: "white" } }}
                label="Post description"
                variant="filled"
                onChange={formik.handleChange("description")}
              />
              <Button
                sx={{ alignSelf: "left" }}
                onClick={formik.handleSubmit}
                variant="contained"
              >
                Make post
              </Button>
            </FormGroup>
          </Box>

        </Grid>

        <Grid size={{ xs: 12, md: 2 }}></Grid>
      </Grid>
    </Box>
  );
};
export default NewPostpage;
