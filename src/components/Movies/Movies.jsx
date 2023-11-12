import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";

import "./Movies.css";

function Movies({
  dataMovies,
  setDataMovies,
  saveMovie,
  deleteMovie,
  isMovieInSavedMovies,
}) {
  const notFoundItem = { id: 999, nameRU: "Ничего не найдено", duration: 0, notFound: "https://i.pinimg.com/originals/bd/df/d6/bddfd6e4434f42662b009295c9bab86e.gif" };
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [filterCheckbox, setFilterCheckbox] = useState(false);
  const search = () => {
    const findShortMovies = dataMovies
      .filter((movie) => {
        return movie.duration < 40;
      })
      .filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(localStorage.getItem("search").toLowerCase());
      });
    const findMovies = dataMovies.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(localStorage.getItem("search").toLowerCase());
    });
    const filteredMovies = filterCheckbox ? findShortMovies : findMovies;
    setMovies(filteredMovies.length === 0 ? [notFoundItem] : filteredMovies);
    localStorage.setItem("movies", JSON.stringify(findMovies));
  };

  const changeShortMovie = () => {
    // setFilterCheckbox(!filterCheckbox);
    const shortMovies = dataMovies.filter((movie) => {
      return movie.duration < 40;
    });
    if (!filterCheckbox) {
      if (text) {
        search();
      } else {
        setMovies(dataMovies);
        localStorage.setItem("movies", JSON.stringify(dataMovies));
      }
    } else {
      if (text) {
        setMovies(movies.filter((movie) => movie.duration < 40));
        localStorage.setItem(
          "movies",
          JSON.stringify(movies.filter((movie) => movie.duration < 40))
        );
      } else {
        setMovies(shortMovies);
        localStorage.setItem("movies", JSON.stringify(shortMovies));
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
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
    <main className="movies">
      <SearchForm
        search={search}
        text={text}
        setText={setText}
        filterCheckbox={filterCheckbox}
        setFilterCheckbox={setFilterCheckbox}
        changeShortMovie={changeShortMovie}
      />
      <MoviesCardList
        dataMovies={movies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        isMovieInSavedMovies={isMovieInSavedMovies}
      />
    </main>
  );
}

export default Movies;
