import Banner from "./Banner/Banner";
import TopRated from "./TopRated/TopRated";
import Trending from "./Trending/Trending";
import Populor from "./populor/populor";

const Home = () => {
  return (
    <div className="homePage">
      <Banner />
      <Trending />
      <Populor />
      <TopRated />
    </div>
  );
};

export default Home;
