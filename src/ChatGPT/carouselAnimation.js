import React, { useState, useEffect } from "react";

const PictureCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const images = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
      setBackgroundPosition(
        backgroundPosition === "center" ? "bottom" : "center"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, backgroundPosition, images.length]);

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
        backgroundImage: `url(${images[currentImage]})`,
        backgroundPosition: backgroundPosition,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition:
          "background-image 0.5s ease-in-out, background-position 0.5s ease-in-out",
      }}
    />
  );
};

export default PictureCarousel;
