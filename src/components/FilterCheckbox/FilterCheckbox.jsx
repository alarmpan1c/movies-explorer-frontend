import "./FilterCheckbox.css";

function FilterCheckbox({
  filterCheckbox,
  setFilterCheckbox,
  changeShortMovie,
}) {
  return (
    <label className="filtercheckbox">
      <input
        type="checkbox"
        className="filtercheckbox__input"
        checked={filterCheckbox}
        onChange={() => {
          setFilterCheckbox(!filterCheckbox);
          localStorage.setItem("filterCheckbox", !filterCheckbox);
        }}
      ></input>
      <span className="filtercheckbox__check"></span>
      <span className="filtercheckbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
