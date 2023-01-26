// To create a React app that generates screenshots of a video at regular intervals, you will need to use the create-react-app tool to set up your project, and then use the HTMLVideoElement and canvas APIs to capture the video frames and draw them to the canvas. You can then use the toDataURL method of the canvas to generate a screenshot, and the createObjectURL and URL.revokeObjectURL APIs to create a URL for the screenshot and add it to an <img> element.

// Here is an example of how you could implement this functionality in your React app
import React, { useRef, useEffect } from "react";
import JSZip from "jszip";
// import videoFile from "./Full Unity Course - Learn Coding in C# by Building Games.mp4";

export function VideoScreenshotGenerator() {
  // Create a reference to the video element
  const videoRef = useRef(null);

  // Create a reference to the canvas element
  const canvasRef = useRef(null);

  // Create a reference to the img element
  const imgRef = useRef(null);

  // Create a reference to the interval ID for the screenshot generation
  const intervalIdRef = useRef(null);

  // A function to generate a screenshot from the video
  const generateScreenshot = () => {
    // Get the video and canvas elements
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Get the width and height of the video
    const width = video.videoWidth;
    const height = video.videoHeight;

    // Set the canvas size to match the video size
    canvas.width = width;
    canvas.height = height;

    // Draw the current frame of the video to the canvas
    canvas.getContext("2d").drawImage(video, 0, 0, width, height);

    // Get the data URL of the canvas image
    const dataURL = canvas.toDataURL();

    // Set the src of the img element to the data URL
    imgRef.current.src = dataURL;
  };

  // A function to start generating screenshots at regular intervals
  const startInterval = () => {
    // Clear any existing interval
    clearInterval(intervalIdRef.current);

    // Start a new interval to generate a screenshot every 1 minute
    intervalIdRef.current = setInterval(generateScreenshot, 60000);
  };

  // A function to stop generating screenshots at regular intervals
  const stopInterval = () => {
    // Clear the interval
    clearInterval(intervalIdRef.current);
  };

  // A function to handle the change event of the video slider
  const handleSliderChange = (event) => {
    // Get the video element
    const video = videoRef.current;

    // Set the current time of the video to the value of the slider
    video.currentTime = event.target.value;
  };

  // A function to handle the click event of the download button
  //   This code uses the JSZip library to create a new ZIP file, and then adds each of the <img> elements to the ZIP file as a PNG image. It then generates the content of the ZIP file as a Blob, creates a URL for the Blob using the createObjectURL API, and simulates a click on a link to the URL in order to download the ZIP file. Finally, it revokes the URL using the URL.revokeObjectURL API once the download is complete.
  const handleDownloadClick = () => {
    // Create a ZIP file containing all of the screenshots
    const zip = new JSZip();

    // Get all of the img elements
    const imgs = document.querySelectorAll("img");

    // Add each img element to the ZIP file
    imgs.forEach((img, index) => {
      zip.file(`screenshot-${index}.png`, img.src.split("base64,")[1], {
        base64: true,
      });
    });

    // Generate the content of the ZIP file as a Blob
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Create a URL for the Blob
      const url = URL.createObjectURL(content);

      // Create a link element to simulate a click on the link
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "screenshots.zip");
      document.body.appendChild(link);
      link.click();

      // Revoke the URL after the download is complete
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    });
  };

  return (
    <div>
      <video
        ref={videoRef}
        onPlay={startInterval}
        onPause={stopInterval}
        controls
      >
        <source
          src={
            "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4"
          }
          type="video/mp4"
        />
      </video>
      {/* This code renders a <video> element with controls, a <canvas> element that is used to generate the screenshots, a range input that can be used to seek through the video, and a button that can be clicked to download the screenshots. It also renders an <img> element for each screenshot. The videoRef, canvasRef, and imgRef references are used to access the video, canvas, and img elements, respectively. The startInterval and stopInterval functions are called when the video starts playing and stops playing, respectively, to start and stop the interval for generating screenshots. The handleSliderChange function is called when the value of the range input changes, and updates the current time of the video accordingly. The handleDownloadClick function is called when the download button is clicked, and generates a ZIP file containing all of the screenshots. */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <input
        type="range"
        min="0"
        max={videoRef.current ? videoRef.current.duration : 0}
        onChange={handleSliderChange}
      />
      <button onClick={handleDownloadClick}>Download Screenshots</button>
      <div>
        {/* Render an img element for each screenshot */}
        {Array.from({
          length: videoRef.current
            ? Math.ceil(videoRef.current.duration / 60)
            : 0,
        }).map((_, index) => (
          <img key={index} ref={imgRef} />
        ))}
      </div>
    </div>
  );
}
