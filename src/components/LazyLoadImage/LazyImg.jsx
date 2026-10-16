import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

// eslint-disable-next-line react/prop-types
const LazyImg = ({ src, className, alt = "" }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt={alt}
      effect="opacity"
      src={src}
      wrapperClassName="lazyImg"
    />
  );
};

export default LazyImg;
