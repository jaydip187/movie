import { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { PlayIcon } from "../detailsBanner/PlayIcon";
import VideoPopup from "../../../components/Video/VideoPop";
import LazyImg from "../../../components/LazyLoadImage/LazyImg";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = (key) => {
    return (
      <div className="videoItem skItem" key={key} aria-hidden="true">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  if (!loading && !data?.results?.length) return null;

  return (
    <section className="videosSection">
      <ContentWrapper>
        <SectionHeader title="Official Videos" />
        <div className="videos">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => loadingSkeleton(i))
            : data.results.map((vid) => {
                return (
                  <button
                    type="button"
                    className="videoItem"
                    key={vid.id}
                    onClick={() => {
                      setVideoId(vid.key);
                      setShow(true);
                    }}
                  >
                    <div className="videoThumbnail">
                      <LazyImg
                        src={`https://img.youtube.com/vi/${vid.key}/mqdefault.jpg`}
                      />
                      <span className="playBadge">
                        <PlayIcon />
                      </span>
                      {vid.type && <span className="videoType">{vid.type}</span>}
                    </div>
                    <div className="videoTitle">{vid.name}</div>
                  </button>
                );
              })}
        </div>
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </section>
  );
};

export default VideosSection;
