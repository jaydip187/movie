import { useState } from "react";
import ApiFeach from "../../../hooks/ApiFeach";
import Carousel from "../../../components/Carousel/Carousel";
import Swicth from "../../../components/Swicth/Swicth";

const Populor = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = ApiFeach(`/${endpoint}/popular`);

  const TabControl = (tab) => {
    setEndpoint(tab);
  };

  return (
    <Carousel
      title="Popular"
      data={data?.results}
      loading={loading}
      endpoint={endpoint}
    >
      <Swicth
        data={["movie", "tv"]}
        TabControl={TabControl}
        label="Popular"
      />
    </Carousel>
  );
};

export default Populor;
