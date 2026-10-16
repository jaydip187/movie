import { useSelector } from "react-redux";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import SectionHeader from "../SectionHeader/SectionHeader";
import LazyImg from "../LazyLoadImage/LazyImg";
import avatar from "../../assets/avatar.png";
import { imageUrl } from "../../utils/image";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = (key) => {
    return (
      <div className="listItem skItem" key={key} aria-hidden="true">
        <div className="profileImg skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  if (!loading && !data?.length) return null;

  return (
    <section className="castSection">
      <ContentWrapper>
        <SectionHeader title="Top Cast" />
        <ul className="listItems">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => skeleton(i))
            : data.map((person) => {
                const ImgUrl =
                  imageUrl(url, person.profile_path, "w185") || avatar;

                return (
                  <li className="listItem" key={person.credit_id || person.id}>
                    <div className="profileImg">
                      <LazyImg src={ImgUrl} alt={person.name} />
                    </div>
                    <div className="name">{person.name}</div>
                    <div className="character">{person.character}</div>
                  </li>
                );
              })}
        </ul>
      </ContentWrapper>
    </section>
  );
};

export default Cast;
