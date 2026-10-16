import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";
import { scoreTone } from "../../utils/format";

const toneColor = {
  high: "var(--score-high)",
  mid: "var(--score-mid)",
  low: "var(--score-low)",
};

// `badge` is the compact score used on posters, `ring` the large one on details.
const Rating = ({ rating, variant = "badge" }) => {
  const value = Number(rating) || 0;
  const tone = scoreTone(value);
  const label = value ? value.toFixed(1) : "NR";

  if (variant === "ring") {
    return (
      <div className="circleRating" aria-label={`Rated ${label} out of 10`}>
        <CircularProgressbar
          value={value}
          maxValue={10}
          text={label}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: toneColor[tone],
            trailColor: "rgba(255,255,255,0.1)",
            pathTransitionDuration: 0.8,
          })}
        />
      </div>
    );
  }

  return (
    <span
      className={`scoreBadge ${value ? tone : "none"}`}
      aria-label={`Rated ${label} out of 10`}
    >
      <span className="dot" aria-hidden="true"></span>
      {label}
    </span>
  );
};

export default Rating;
