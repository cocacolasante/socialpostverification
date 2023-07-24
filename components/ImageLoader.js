import Image from 'next/image';
import { useState } from 'react';
import nextSvg from "../public/next.svg"


const ImageLoader = ({ imageUrl }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true); // Default to true to assume image loads successfully

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  return (
    <>
      {isImageLoaded ? (
        <Image
          src={imageUrl}
          alt="Image"
          width={200}
          height={200}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <Image src={nextSvg} alt='placeholder' width={250} height={250} />
      )}
    </>
  );
};

export default ImageLoader;
