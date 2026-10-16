import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import LazyImg from "../LazyLoadImage/LazyImg";
import Rating from "../Rating/Rating";
import Genres from "../Genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { imageUrl } from "../../utils/image";
import { formatDate, releaseDateOf } from "../../utils/format";

const Card = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const type = data.media_type || mediaType;
  const posterUrl = imageUrl(url, data.poster_path, "w500") || PosterFallback;
  const title = data.title || data.name;
  const date = formatDate(releaseDateOf(data));

  return (
    <Link className="movieCard" to={`/${type}/${data.id}`}>
      <div className="posterBlock">
        <LazyImg className="posterImg" src={posterUrl} alt="" />
        {!fromSearch && (
          <>
            <div className="posterTop">
              <Rating rating={data.vote_average} />
            </div>
            <div className="posterHover" aria-hidden="true">
              <Genres data={data.genre_ids?.slice(0, 2)} />
            </div>
          </>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{title}</span>
        <span className="date">
          {date || "Date TBA"}
          {fromSearch && type && (
            <span className="type">{type === "tv" ? "TV" : "Movie"}</span>
          )}
        </span>
      </div>
    </Link>
  );
};

export default Card;
