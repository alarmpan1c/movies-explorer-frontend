import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

import "./SearchForm.css";

function SearchForm({
  search,
  text,
  setText,
  filterCheckbox,
  setFilterCheckbox,
  changeShortMovie,
}) {
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
            search();
          }}
        >
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Фильм"
            required
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
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
