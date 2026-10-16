import { useState, useEffect } from "react";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import CardSkeleton from "../../components/Card/CardSkeleton";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pagenum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const feachDataIntial = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${encodeURIComponent(query)}&page=1`).then(
      (res) => {
        setData(res);
        setPageNum(2);
        setLoading(false);
      }
    );
  };

  const feachNextPageData = () => {
    fetchDataFromApi(
      `/search/multi?query=${encodeURIComponent(query)}&page=${pagenum}`
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...(res?.results || [])],
        });
      } else {
        setData(res);
      }

      setPageNum((num) => num + 1);
    });
  };

  useEffect(() => {
    feachDataIntial();
  }, [query]);

  const results = data?.results?.filter((item) => item.media_type !== "person");

  return (
    <div className="searchResultsPage pageShell">
      <ContentWrapper>
        <div className="pageHeading">
          <div>
            <span className="eyebrow">Search</span>
            <h1 className="pageTitle">&ldquo;{query}&rdquo;</h1>
            {!loading && data?.total_results > 0 && (
              <p className="meta">
                {`${data.total_results.toLocaleString()} ${
                  data.total_results > 1 ? "results" : "result"
                }`}
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="content">
            {Array.from({ length: 12 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : results?.length > 0 ? (
          <InfiniteScroll
            className="content"
            dataLength={data?.results?.length || 0}
            next={feachNextPageData}
            hasMore={pagenum <= data.total_pages}
            loader={<Loader />}
          >
            {results.map((item) => (
              <Card data={item} key={`${item.media_type}-${item.id}`} fromSearch={true} />
            ))}
          </InfiniteScroll>
        ) : (
          <div className="emptyState resultNotFound">
            <h2>No results found</h2>
            <p>
              Check the spelling or try a shorter title. You can also browse
              everything by genre.
            </p>
            <Link to="/explore/movie" className="btn secondary">
              Explore movies
            </Link>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;
