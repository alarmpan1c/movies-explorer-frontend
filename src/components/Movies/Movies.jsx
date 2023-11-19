import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import moviesApi from "../../utils/MoviesApi";

import "./Movies.css";
import Preloader from "../Preloader/Preloader";

function Movies({
  // dataMovies,
  // setDataMovies,
  saveMovie,
  deleteMovie,
  isMovieInSavedMovies,
  isLoading,
  setIsLoading,
  dataSavedMovies,
  setDataSavedMovies,
  shortDataSavedMovies,
  setShorDataSavedMovies,
}) {
  const notFoundItem = {
    id: 999,
    nameRU: "Ничего не найдено",
    duration: 0,
    trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    notFound:
      "https://i.pinimg.com/originals/bd/df/d6/bddfd6e4434f42662b009295c9bab86e.gif",
  };
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [filterCheckbox, setFilterCheckbox] = useState(
    localStorage.getItem("filterCheckbox") || ""
  );
  const [shortMovies, setShortMovies] = useState(
    JSON.parse(localStorage.getItem("shortMovies" || []))
  );
  const [firstRender, setFirstRender] = useState(true);
  const [dataMovies, setDataMovies] = useState(
    JSON.parse(localStorage.getItem("startMovies" || []))
  );
  const [shortDataMovies, setShortDataMovies] = useState(
    JSON.parse(localStorage.getItem("shortStartMovies" || []))
  );

  console.log("shortDataSavedMovies", shortDataSavedMovies);
  function search(searchValue) {
    // Проверяем, был ли уже выполнен запрос
    if (!localStorage.getItem("startMovies")) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((moviesResponse) => {
          // Обработка данных и установка состояний
          const findShortMovies = moviesResponse.filter(
            (movie) => movie.duration < 40
          );
          const findMovies = moviesResponse;

          setShortDataMovies(
            findShortMovies.length === 0 ? [notFoundItem] : findShortMovies
          );
          setDataMovies(findMovies.length === 0 ? [notFoundItem] : findMovies);

          // Сохранение данных в localStorage
          localStorage.setItem(
            "startMovies",
            JSON.stringify(
              findMovies.length === 0 ? [notFoundItem] : findMovies
            )
          );
          localStorage.setItem(
            "shortStartMovies",
            JSON.stringify(
              findShortMovies.length === 0 ? [notFoundItem] : findShortMovies
            )
          );

          const findShortMovie = findShortMovies.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          });
          const findMovie = findMovies.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          });

          setShortMovies(
            findShortMovies.length === 0 ? [notFoundItem] : findShortMovie
          );
          setMovies(findMovies.length === 0 ? [notFoundItem] : findMovie);
          localStorage.setItem(
            "movies",
            JSON.stringify(findMovies.length === 0 ? [notFoundItem] : findMovie)
          );
          localStorage.setItem(
            "shortMovies",
            JSON.stringify(
              findShortMovies.length === 0 ? [notFoundItem] : findShortMovie
            )
          );
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Если запрос уже был выполнен, фильтруем существующие данные
      const findShortMovies = shortDataMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase());
      });
      const findMovies = dataMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase());
      });

      setShortMovies(
        findShortMovies.length === 0 ? [notFoundItem] : findShortMovies
      );
      setMovies(findMovies.length === 0 ? [notFoundItem] : findMovies);

      localStorage.setItem(
        "movies",
        JSON.stringify(findMovies.length === 0 ? [notFoundItem] : findMovies)
      );
      localStorage.setItem(
        "shortMovies",
        JSON.stringify(
          findShortMovies.length === 0 ? [notFoundItem] : findShortMovies
        )
      );
    }
  }

  function changeShortMovie(isTrue) {
    isTrue
      ? localStorage.setItem("filterCheckbox", true)
      : localStorage.setItem("filterCheckbox", "");
    setFilterCheckbox(isTrue);
    search(localStorage.getItem("search") || "");
  }

  return (
    <main className="movies">
      <SearchForm
        search={search}
        // text={text}
        // setText={setText}
        filterCheckbox={filterCheckbox}
        setFilterCheckbox={setFilterCheckbox}
        changeShortMovie={changeShortMovie}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          dataMovies={filterCheckbox ? shortMovies : movies}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          isMovieInSavedMovies={isMovieInSavedMovies}
          setDataMovies={setDataMovies}
          dataSavedMovies={dataSavedMovies}
          setDataSavedMovies={setDataSavedMovies}
          setShorDataSavedMovies={setShorDataSavedMovies}
          setShortDataMovies={setShortDataMovies}
          shortDataSavedMovies={shortDataSavedMovies}
        />
      )}
    </main>
  );
}

export default Movies;
