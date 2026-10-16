import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowRight } from "react-icons/fi";

import "./style.scss";
import ApiFeach from "../../../hooks/ApiFeach";
import LazyImg from "../../../components/LazyLoadImage/LazyImg";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Rating from "../../../components/Rating/Rating";
import { imageUrl } from "../../../utils/image";
import { formatDate, releaseDateOf } from "../../../utils/format";

const Banner = () => {
  const { url, genres } = useSelector((state) => state.home);
  const { data, loading } = ApiFeach("/movie/popular");

  // Pick one popular title with artwork to feature on each visit.
  const featured = useMemo(() => {
    const withArt = data?.results?.filter((item) => item.backdrop_path) || [];
    return withArt[Math.floor(Math.random() * withArt.length)];
  }, [data]);

  const bg = imageUrl(url, featured?.backdrop_path, "original");
  const year = formatDate(releaseDateOf(featured), "YYYY");
  const genreNames = featured?.genre_ids
    ?.map((id) => genres[id]?.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="banner" aria-label="Featured">
      <div className="bgclass">{bg && <LazyImg className="xyz" src={bg} />}</div>
      <div className="opacity-layer"></div>

      <ContentWrapper>
        {loading || !featured ? (
          <div className="content loading" aria-hidden="true">
            <div className="skeleton sk-eyebrow"></div>
            <div className="skeleton sk-title"></div>
            <div className="skeleton sk-line"></div>
            <div className="skeleton sk-line short"></div>
          </div>
        ) : (
          <div className="content">
            <span className="eyebrow">Featured · Popular this week</span>
            <h1 className="title">{featured.title || featured.name}</h1>
            <div className="meta">
              <Rating rating={featured.vote_average} />
              {year && <span>{year}</span>}
              {genreNames?.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <p className="overview">{featured.overview}</p>
            <div className="actions">
              <Link className="btn primary" to={`/movie/${featured.id}`}>
                View details
                <FiArrowRight aria-hidden="true" />
              </Link>
              <Link className="btn secondary" to="/explore/movie">
                Browse movies
              </Link>
            </div>
          </div>
        )}
      </ContentWrapper>
    </section>
  );
};

export default Banner;
