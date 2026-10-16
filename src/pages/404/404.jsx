import { Link } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "./style.scss";

const ErrorPage = () => {
  return (
    <div className="pageShell">
      <ContentWrapper>
        <div className="not-found">
          <span className="code">404</span>
          <h1>This page isn&apos;t showing</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="actions">
            <Link to="/" className="btn primary">
              Back to home
            </Link>
            <Link to="/explore/movie" className="btn secondary">
              Explore movies
            </Link>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ErrorPage;
