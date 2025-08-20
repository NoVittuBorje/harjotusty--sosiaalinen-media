import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../hooks/useUploadImage";
const FileUpload = ({ userid, setImagePath }) => {
  const [mutate, result] = useUploadImage();
  console.log(result)
  const onDrop = useCallback(
    (acceptedFiles) => {
      // do something here
      console.log(acceptedFiles);
      const variables = {
        userId: userid,
        file: acceptedFiles,
      };
      const handleupload = async (variables) => {
        const data = await mutate(variables);
        setImagePath(data.data.singleUpload);
      };
      handleupload(variables);
    },
    [mutate, setImagePath, userid]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && "isActive"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <p>click to select image or drop here</p>
        )}
      </div>
    </>
  );
};
export default FileUpload;
