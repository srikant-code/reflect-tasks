import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCutout = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const imageElement = new Image();
    imageElement.src = image;

    imageElement.onload = () => {
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      context.drawImage(imageElement, 0, 0);

      // Get the image data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Set a threshold for determining which pixels to remove
      const threshold = 100;

      // Iterate through all the pixels and remove those with a low alpha value
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < threshold) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 0;
        }
      }

      // Put the modified image data back onto the canvas
      context.putImageData(imageData, 0, 0);

      // Get the image data URL and trigger a download
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = dataURL;
      link.click();
    };
  };

  return (
    <div className="App">
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
      />
      <button onClick={handleCutout}>Cutout</button>
      {image && <img src={image} alt="Preview" />}
    </div>
  );
};

export default App;
// This app has an input field that allows the user to select an image file, and a "Cutout" button that will cut out the subject of the image and trigger a download.

// When the user selects an image file, the app sets the image state variable to a data URL for the image file, and displays the image using an img element. When the user clicks the "Cutout" button, the app creates a canvas element, draws the image onto the canvas, and uses the same image processing techniques as the previous example to remove the pixels with a low alpha value. It then uses the canvas's toDataURL method to get a data URL for the image and triggers a download using a link element.

// I hope this helps! Let me know if you have any questions or need further clarification.

// This component will render a canvas element and an invisible img element, and use the img element to draw the image onto the canvas. It will then use the canvas context's getImageData method to get the image data and iterate through the pixel data, setting the alpha value to 0 for any pixels with an alpha value above the threshold. Finally, it will use the putImageData method to put the modified image data back onto the canvas.

// When the user clicks the "Download" button, the component will use the canvas's toDataURL method to get a data URL for the image, create a link element with the data URL as the href and trigger a download.
