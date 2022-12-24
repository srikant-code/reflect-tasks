// Here is an example of how you could use React to create a form that allows the user to select multiple videos and choose an output format, and then upload the videos to the server for conversion:
import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const ConvertForm = () => {
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    multiple: true,
    onDrop,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to hold the files and output format
    const formData = new FormData();
    formData.append("outputFormat", outputFormat);
    files.forEach((file) => {
      formData.append("videos", file);
    });

    // Send the FormData object to the server
    axios.post("/convert", formData).then((response) => {
      // Do something with the response from the server
      console.log(response);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some videos here, or click to select files</p>
      </div>
      <div>
        {files.map((file) => (
          <p key={file.path}>{file.path}</p>
        ))}
      </div>
      <label htmlFor="outputFormat">Output Format:</label>
      <select
        id="outputFormat"
        value={outputFormat}
        onChange={(event) => setOutputFormat(event.target.value)}
      >
        <option value="mp4">MP4</option>
        <option value="webm">WebM</option>
        <option value="ogv">OGV</option>
      </select>
      <button type="submit">Convert</button>
    </form>
  );
};

export default ConvertForm;

// This code creates a form with a dropzone that allows the user to select multiple videos and a select menu to choose the output format. When the form is submitted, it uses the axios library to send a POST request to the server with the selected videos and output format as a FormData object.

// You will need to customize this code to fit your specific needs, such as displaying a list of the selected videos or handling errors from the server.
