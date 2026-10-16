import { useState } from "react";
import "./style.scss";

const defaultLabels = {
  movie: "Movies",
  tv: "TV",
  day: "Today",
  week: "This week",
};

const Swicth = ({ data, TabControl, labels = defaultLabels, label }) => {
  const [tab, setTab] = useState(0);

  const activeTab = (item, index) => {
    if (index === tab) return;
    setTab(index);
    TabControl(item, index);
  };

  const onKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (tab + step + data.length) % data.length;
    activeTab(data[next], next);
    event.currentTarget.parentElement.children[next]?.focus();
  };

  return (
    <div
      className="switchingTabs"
      role="tablist"
      aria-label={label}
      style={{ "--count": data.length, "--index": tab }}
    >
      {data.map((item, index) => (
        <button
          type="button"
          role="tab"
          aria-selected={tab === index}
          tabIndex={tab === index ? 0 : -1}
          className={`tabItem ${tab === index ? "active" : ""}`}
          key={item}
          onClick={() => activeTab(item, index)}
          onKeyDown={onKeyDown}
        >
          {labels[item] || item}
        </button>
      ))}
      <span className="movingBg" aria-hidden="true"></span>
    </div>
  );
};

export default Swicth;
