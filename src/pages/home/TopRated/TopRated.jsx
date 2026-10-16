import { useState } from "react";
import ApiFeach from "../../../hooks/ApiFeach";
import Carousel from "../../../components/Carousel/Carousel";
import Swicth from "../../../components/Swicth/Swicth";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = ApiFeach(`/${endpoint}/top_rated`);

  const TabControl = (tab) => {
    setEndpoint(tab);
  };

  return (
    <Carousel
      title="Top Rated"
      data={data?.results}
      loading={loading}
      endpoint={endpoint}
    >
      <Swicth
        data={["movie", "tv"]}
        TabControl={TabControl}
        label="Top Rated"
      />
    </Carousel>
  );
};

export default TopRated;
