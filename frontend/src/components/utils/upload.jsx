
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../hooks/useUploadImage";
const FileUpload = ({userid}) => {
const [mutate,result] = useUploadImage()
  const onDrop = useCallback((acceptedFiles) => {
    // do something here
    console.log(acceptedFiles);
    const variables = {
        userId:userid,
        file:acceptedFiles,
    }
    mutate(variables)
  }, [mutate,userid]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  
  return (
    <>
      <div {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        
      </div>
    </>
  );
};
export default FileUpload;


