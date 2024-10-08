import { LazyLoadImage } from "react-lazy-load-image-component";

// eslint-disable-next-line react/prop-types
const LazyImg = ({ src, className }) => {
  // console.log(src);
  return (
    <div>
      <LazyLoadImage
        className={className || ""}
        alt=""
        effect="opacity"
        src={src}
      />
      ;
    </div>
  );
};

export default LazyImg;
