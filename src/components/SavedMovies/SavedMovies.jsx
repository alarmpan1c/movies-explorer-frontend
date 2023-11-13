import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

import "./SavedMovies.css";
function SavedMovies({
  saveMovie,
  deleteMovie,
  dataSavedMovies,
  isMovieInSavedMovies,
}) {
  const notFoundItem = {
    id: 999,
    nameRU: "Ничего не найдено",
    duration: 0,
    notFound: "https://i.pinimg.com/originals/bd/df/d6/bddfd6e4434f42662b009295c9bab86e.gif",
  };
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [filterCheckbox, setFilterCheckbox] = useState(false);
  const search = () => {
    const findShortMovies = dataSavedMovies
      .filter((movie) => {
        return movie.duration < 40;
      })
      .filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(localStorage.getItem("search").toLowerCase());
      });
    const findMovies = dataSavedMovies.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(localStorage.getItem("search").toLowerCase());
    });
    const filteredMovies = filterCheckbox ? findShortMovies : findMovies;
    setMovies(filteredMovies.length === 0 ? [notFoundItem] : filteredMovies);
    localStorage.setItem("saveMovies", JSON.stringify(findMovies));
  };

  const changeShortMovie = () => {
    const shortMovies = dataSavedMovies.filter((movie) => {
      return movie.duration < 40;
    });
    if (!filterCheckbox) {
      if (text) {
        search();
      } else {
        setMovies(dataSavedMovies);
        localStorage.setItem("saveMovies", JSON.stringify(dataSavedMovies));
      }
    } else {
      if (text) {
        setMovies(movies.filter((movie) => movie.duration < 40));
        localStorage.setItem(
          "saveMovies",
          JSON.stringify(movies.filter((movie) => movie.duration < 40))
        );
      } else {
        setMovies(shortMovies);
        localStorage.setItem("saveMovies", JSON.stringify(shortMovies));
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("saveMovies")) {
      setMovies(JSON.parse(localStorage.getItem("saveMovies")));
    }
    if (localStorage.getItem("search")) {
      setText(localStorage.getItem("search"));
    }
    if (localStorage.getItem("filterCheckbox")) {
      const filterCheck =
        localStorage.getItem("filterCheckbox") === "true" ? true : false;
      setFilterCheckbox(filterCheck);
    }
  }, []);

  useEffect(() => {
    changeShortMovie();
  }, [filterCheckbox]);

  return (
    <main className="saved-movies">
      <SearchForm
        search={search}
        text={text}
        setText={setText}
        filterCheckbox={filterCheckbox}
        setFilterCheckbox={setFilterCheckbox}
        changeShortMovie={changeShortMovie}
      />
      <MoviesCardList
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        dataMovies={movies}
        isMovieInSavedMovies={isMovieInSavedMovies}
      />
      <div className="saved-movies__container"></div>
    </main>
  );
}

export default SavedMovies;
