import { useState } from "react";

function LazyLoadImage({ src, alt, className }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <i className="fas fa-spin fa-spinner text-2xl text-gray-500"></i>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        className={`transition-opacity duration-500 ease-in-out object-cover w-full h-full ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default LazyLoadImage;
