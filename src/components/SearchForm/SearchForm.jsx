import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";

function SearchForm({
  search,
  query,
  setQuery,
  filterCheckbox,
  setFilterCheckbox,
  changeShortMovie,
}) {
  // const [text, setText] = useState(localStorage.getItem("search") || "");

  const location = useLocation();

  const [text, setText] = useState(
    location.pathname === "/movies"
      ? localStorage.getItem("search") || ""
      : ""
  );

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("search", text);
            location.pathname === "/movies" ? search(text) : search(query);
          }}
        >
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Фильм"
            required
            onChange={(event) => {
              location.pathname === "/movies" ? setText(event.target.value) : setQuery(event.target.value);
            }}
            value={location.pathname === "/movies" ? text : query}
          />
          <button className="search__button" type="submit"></button>
        </form>
        <FilterCheckbox
          filterCheckbox={filterCheckbox}
          setFilterCheckbox={setFilterCheckbox}
          changeShortMovie={changeShortMovie}
        />
      </div>
    </section>
  );
}

export default SearchForm;
