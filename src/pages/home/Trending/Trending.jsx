import { useState } from "react";
import ApiFeach from "../../../hooks/ApiFeach";
import Carousel from "../../../components/Carousel/Carousel";
import Swicth from "../../../components/Swicth/Swicth";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = ApiFeach(`/trending/all/${endpoint}`);

  const TabControl = (tab) => {
    setEndpoint(tab);
  };

  return (
    <Carousel title="Trending" data={data?.results} loading={loading}>
      <Swicth
        data={["day", "week"]}
        TabControl={TabControl}
        label="Trending"
      />
    </Carousel>
  );
};

export default Trending;
