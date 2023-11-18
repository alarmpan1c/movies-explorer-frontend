import "./FilterCheckbox.css";
import { useLocation } from "react-router-dom";

function FilterCheckbox({
  filterCheckbox,
  setFilterCheckbox,
  changeShortMovie,
}) {
  const location = useLocation();
  return (
    <label className="filtercheckbox">
      <input
        type="checkbox"
        className="filtercheckbox__input"
        checked={filterCheckbox}
        onChange={() => {
          changeShortMovie(!filterCheckbox);
          setFilterCheckbox(!filterCheckbox);
          location.pathname === "/movies" &&
            localStorage.setItem("filterCheckbox", !filterCheckbox ? true : "");
          // localStorage.setItem("filterCheckbox", !filterCheckbox);
        }}
      ></input>
      <span className="filtercheckbox__check"></span>
      <span className="filtercheckbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
