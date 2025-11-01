import React, { useState, useEffect } from "react";
import { images } from "../../../Assets/ImageMap";
import Products from "../Products/Products";

const Header = () => {
  // 1. State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. useEffect hook to handle the automatic sliding
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Checking if images array is empty or not loaded
  if (!images || images.length === 0) {
    return <div className="text-center p-4">Loading header images...</div>;
  }

  // Get the current image source
  const currentImage = images[currentIndex];

  return (
    <>
      <div className="relative w-full overflow-hidden h-96">
        {" "}
        <img
          src={currentImage}
          alt={`Slider Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
        {/* Navigation Dots/Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index
                  ? "bg-white"
                  : "bg-gray-500 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div>
        <Products/>
      </div>
    </>
  );
};

export default Header;
