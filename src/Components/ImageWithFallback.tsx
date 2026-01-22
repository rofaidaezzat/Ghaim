import { useState, useEffect } from "react";
import logo from "../assets/nagem_fashion_logo.png";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc = logo,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
