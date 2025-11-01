import React, { useState, useEffect } from "react";
// Assuming the path to your images is correct
import { images } from "../../../Assets/ImageMap";
import Products from "../Products/Products";

const Header = () => {
  // 1. State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. useEffect hook to handle the automatic sliding
  useEffect(() => {
    // Set up an interval to change the image every 3 seconds (3000ms)
    const intervalId = setInterval(() => {
      // Calculate the next index: (current + 1) % total length
      // This ensures it wraps around to 0 when it reaches the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  // Check if images array is empty or not loaded
  if (!images || images.length === 0) {
    return <div className="text-center p-4">Loading header images...</div>;
  }

  // Get the current image source
  const currentImage = images[currentIndex];

  return (
    <>
      <div className="relative w-full overflow-hidden h-96">
        {" "}
        {/* h-96 sets the height for the slider */}
        {/* The main image container with a transition for smooth effect */}
        <img
          src={currentImage}
          alt={`Slider Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          // Optional: you can dynamically apply animation classes if needed,
          // but simple state change with CSS transition is cleaner here.
        />
        {/* Optional: Navigation Dots/Indicators */}
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
