import "./style.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import SectionHeader from "../SectionHeader/SectionHeader";
import Card from "../Card/Card";
import CardSkeleton from "../Card/CardSkeleton";

const Carousel = ({ data, loading, endpoint, title, children }) => {
  const carouselRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (el) el.scrollLeft = 0;
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [data, loading, updateEdges]);

  const navigation = (dir) => {
    const el = carouselRef.current;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const hasItems = data?.length > 0;

  return (
    <section className="carousel">
      <ContentWrapper>
        {(title || children) && (
          <SectionHeader title={title}>
            {children}
            <div className="carouselNav">
              <button
                type="button"
                className="arrow"
                aria-label="Scroll left"
                disabled={loading || edges.start}
                onClick={() => navigation("left")}
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="arrow"
                aria-label="Scroll right"
                disabled={loading || !hasItems || edges.end}
                onClick={() => navigation("right")}
              >
                <FiChevronRight />
              </button>
            </div>
          </SectionHeader>
        )}

        {loading ? (
          <div className="carouselItems">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="carouselItem" key={i}>
                <CardSkeleton />
              </div>
            ))}
          </div>
        ) : hasItems ? (
          <div
            className={`carouselItems ${edges.start ? "" : "fadeStart"} ${
              edges.end ? "" : "fadeEnd"
            }`}
            ref={carouselRef}
            onScroll={updateEdges}
          >
            {data.map((item) => (
              <div className="carouselItem" key={item.id}>
                <Card data={item} mediaType={endpoint} />
              </div>
            ))}
          </div>
        ) : (
          <p className="emptyState compact">Nothing to show here yet.</p>
        )}
      </ContentWrapper>
    </section>
  );
};

export default Carousel;
