import parse from "html-react-parser";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import TextEditor from "../../utils/TextEditor";
import { Box, Button, Typography } from "@mui/material";

const EditFeedDesc = ({ feed, handleSave, setOpen }) => {
  console.log(open);
  const validationSchema = yup.object().shape({
    description: yup.string().min(10).required(),
  });
  const description = feed.description ? feed.description : "";
  const formik = useFormik({
    initialValues: {
      description: description,
      feedid:feed.id
    },
    onSubmit: (values) => {
      handleSave({ content: values.description, feedid: values.feedid,action:"editdesc" });
    },
    validationSchema,
  });

  console.log(description);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextEditor
        html={formik.values.description}
        setHtml={formik.handleChange("description")}
      ></TextEditor>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          className="button"
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 50 }}
          onClick={formik.handleSubmit}
        >
          Save
        </Button>

        <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => setOpen(!open)}
        >
          cancel
        </Button>
      </Box>
    </Box>
  );
};
export default EditFeedDesc;
