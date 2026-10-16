import { useParams } from "react-router-dom";
import ApiFeach from "../../hooks/ApiFeach";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "../../components/Cast/Cast";
import VideosSection from "./VideoSection/VideoSection";
import Similar from "../Similar&Recommedation/Similar";
import Recommendation from "../Similar&Recommedation/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = ApiFeach(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = ApiFeach(
    `/${mediaType}/${id}/credits`
  );
  const videos = data?.results || [];
  const trailer =
    videos.find((result) => result.name === "Official Trailer") ||
    videos.find((result) => result.type === "Trailer");

  return (
    <div className="detailsPage">
      <DetailsBanner video={trailer} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
