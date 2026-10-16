import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player/youtube";
import { FiX } from "react-icons/fi";

import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const closeRef = useRef(null);

  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  useEffect(() => {
    if (!show) return;
    const previous = document.activeElement;
    const onKey = (event) => event.key === "Escape" && hidePopup();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return createPortal(
    <div
      className={`videoPopup ${show ? "visible" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      aria-hidden={!show}
    >
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <button
          type="button"
          className="closeBtn"
          onClick={hidePopup}
          ref={closeRef}
          tabIndex={show ? 0 : -1}
        >
          <FiX aria-hidden="true" />
          Close
        </button>
        <div className="playerFrame">
          {show && videoId ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
              width="100%"
              height="100%"
              playing={true}
            />
          ) : (
            show && <p className="noVideo">No trailer available.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoPopup;
