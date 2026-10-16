import "./style.scss";

const SectionHeader = ({ title, id, children }) => {
  return (
    <div className="sectionHeader">
      <h2 id={id}>{title}</h2>
      {children && <div className="actions">{children}</div>}
    </div>
  );
};

export default SectionHeader;
