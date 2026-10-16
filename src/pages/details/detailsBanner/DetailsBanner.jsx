import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import { PlayIcon } from "./PlayIcon";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import ApiFeach from "../../../hooks/ApiFeach";
import Genres from "../../../components/Genres/Genres";
import Rating from "../../../components/Rating/Rating";
import LazyImg from "../../../components/LazyLoadImage/LazyImg";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/Video/VideoPop";
import { imageUrl } from "../../../utils/image";
import { formatDate, releaseDateOf } from "../../../utils/format";

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

const names = (people) => people.map((person) => person.name).join(", ");

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = ApiFeach(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const director = crew?.filter((role) => role.job === "Director");
  const writer = crew?.filter(
    (role) =>
      role.job === "Writer" || role.job === "Story" || role.job === "Screenplay"
  );

  if (loading) {
    return (
      <div className="detailsBanner">
        <ContentWrapper>
          <div className="detailsBannerSkeleton" aria-hidden="true">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    );
  }

  if (!data?.id) {
    return (
      <div className="detailsBanner">
        <ContentWrapper>
          <div className="emptyState">
            <h2>We couldn&apos;t load this title</h2>
            <p>Check your connection and try again.</p>
          </div>
        </ContentWrapper>
      </div>
    );
  }

  const releaseDate = releaseDateOf(data);
  const year = formatDate(releaseDate, "YYYY");
  const runtime = data.runtime || data.episode_run_time?.[0];
  const backdrop = imageUrl(url, data.backdrop_path, "original");
  const poster = imageUrl(url, data.poster_path, "w780") || PosterFallback;

  const facts = [
    { label: "Status", value: data.status },
    { label: "Release date", value: formatDate(releaseDate) },
    { label: "Runtime", value: runtime ? toHoursAndMinutes(runtime) : "" },
    {
      label: "Seasons",
      value: data.number_of_seasons ? String(data.number_of_seasons) : "",
    },
  ].filter((fact) => fact.value);

  const credits = [
    { label: director?.length > 1 ? "Directors" : "Director", people: director },
    { label: "Writer", people: writer },
    { label: "Created by", people: data.created_by },
  ].filter((credit) => credit.people?.length > 0);

  return (
    <div className="detailsBanner">
      {backdrop && (
        <div className="backdrop-img">
          <LazyImg src={backdrop} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="content">
          <div className="left">
            <LazyImg
              className="posterImg"
              src={poster}
              alt={`${data.name || data.title} poster`}
            />
          </div>

          <div className="right">
            <span className="eyebrow">
              {mediaType === "tv" ? "TV Series" : "Movie"}
            </span>
            <h1 className="title">
              {data.name || data.title}
              {year && <span className="year"> ({year})</span>}
            </h1>
            {data.tagline && <p className="subtitle">{data.tagline}</p>}

            <Genres data={data.genres?.map((item) => item.id)} />

            <div className="row">
              <div className="score">
                <Rating rating={data.vote_average} variant="ring" />
                <span className="scoreLabel">
                  User
                  <br />
                  score
                </span>
              </div>
              <button
                type="button"
                className="btn primary playbtn"
                disabled={!video}
                onClick={() => {
                  setShow(true);
                  setVideoId(video?.key);
                }}
              >
                <PlayIcon />
                <span className="text">
                  {video ? "Watch Trailer" : "No trailer"}
                </span>
              </button>
            </div>

            {data.overview && (
              <div className="overview">
                <h2 className="heading">Overview</h2>
                <p className="description">{data.overview}</p>
              </div>
            )}

            {facts.length > 0 && (
              <dl className="facts">
                {facts.map((fact) => (
                  <div className="infoItem" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {credits.length > 0 && (
              <dl className="info">
                {credits.map((credit) => (
                  <div className="infoRow" key={credit.label}>
                    <dt>{credit.label}</dt>
                    <dd>{names(credit.people)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default DetailsBanner;
