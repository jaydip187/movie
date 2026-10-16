import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ data, className = "" }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <ul className={`genres ${className}`}>
      {data?.map((item) =>
        genres[item]?.name ? (
          <li key={item} className="genre">
            {genres[item].name}
          </li>
        ) : null
      )}
    </ul>
  );
};

export default Genres;
