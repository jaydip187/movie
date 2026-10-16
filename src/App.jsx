import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./Sciles/HomeSlice";
import { fetchDataFromApi } from "./utils/api";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Details from "./pages/details/Details";
import SearchResult from "./pages/result/SearchResult";
import Explore from "./pages/explore/Explore";
import ErrorPage from "./pages/404/404";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Starts each new page at the top and replays the page-enter transition.
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="appMain">
      <div className="page" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    ApiFeact();
    callGenres();
  }, []);

  const ApiFeact = () => {
    fetchDataFromApi("/configuration").then((res) => {
      dispatch(getApiConfiguration(res));
    });
  };

  const callGenres = async () => {
    let promises = [];
    let endPoint = ["movie", "tv"];
    let allgenres = {};

    endPoint.forEach((item) => {
      promises.push(fetchDataFromApi(`/genre/${item}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres?.map((item) => (allgenres[item.id] = item));
    });

    dispatch(getGenres(allgenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
