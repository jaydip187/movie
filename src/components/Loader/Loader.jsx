import "./style.scss";

const Loader = ({ initial }) => {
  return (
    <div
      className={`loadingSpinner ${initial ? "initial" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="spinner" aria-hidden="true"></span>
      <span className="visually-hidden">Loading</span>
    </div>
  );
};

export default Loader;
