import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";
function SavedMovies({
  saveMovie,
  deleteMovie,
  dataSavedMovies,
  isMovieInSavedMovies,
  isLoading,
  shortDataSavedMovies,
  setDataSavedMovies,
}) {
  const notFoundItem = {
    id: 999,
    nameRU: "Ничего не найдено",
    duration: 0,
    trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    notFound: "https://i.pinimg.com/originals/bd/df/d6/bddfd6e4434f42662b009295c9bab86e.gif",
  };
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [filterCheckbox, setFilterCheckbox] = useState(false);
  const search = (searchValue) => {
    // setText(searchValue);
    const findShortMovies = shortDataSavedMovies
      .filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
    const findMovies = dataSavedMovies.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    const filteredMovies = filterCheckbox ? findShortMovies : findMovies;
    setMovies(filteredMovies.length === 0 ? [notFoundItem] : filteredMovies);
  };

  const changeShortMovie = (isFilterCheckbox) => {
    if (isFilterCheckbox) {
      console.log("1")
      const findShortMovies = shortDataSavedMovies.filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(text.toLowerCase());
      })
      setMovies(findShortMovies.length === 0 ? [notFoundItem] : findShortMovies);
    } else {
      console.log("2")
      const findMovies = dataSavedMovies.filter((movie) => {
          return movie.nameRU
            .toLowerCase()
            .includes(text.toLowerCase());
      })
      setMovies(findMovies.length === 0 ? [notFoundItem] : findMovies);
    }
  };

  useEffect(() => {
    if (text) {
      search(text);
    } else {
      if (filterCheckbox) {
        setMovies(shortDataSavedMovies);
      } else {
        setMovies(dataSavedMovies);
      }
    // setMovies(dataSavedMovies);
    }
  }, [dataSavedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        search={search}
        query={text}
        setQuery={setText}
        filterCheckbox={filterCheckbox}
        setFilterCheckbox={setFilterCheckbox}
        changeShortMovie={changeShortMovie}
      />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        dataMovies={movies.length === 0 ? dataSavedMovies : movies}
        setDataSMovies={setDataSavedMovies}
        isMovieInSavedMovies={isMovieInSavedMovies}
      />}
      <div className="saved-movies__container"></div>
    </main>
  );
}

export default SavedMovies;
