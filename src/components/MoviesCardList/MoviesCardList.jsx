import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";

function MoviesCardList({
  dataMovies,
  saveMovie,
  deleteMovie,
  isMovieInSavedMovies,
  setDataMovies,
  dataSavedMovies,
  setDataSavedMovies,
  shortDataSavedMovies,
  setShorDataSavedMovies,
}) {
  console.log("shortDataSavedMovies 2", shortDataSavedMovies);

  const location = useLocation();
  const [displayCount, setDisplayCount] = useState(4); // Начальное количество карточек в ряду
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1170) {
        setDisplayCount(12);
      } else if (window.innerWidth >= 721) {
        setDisplayCount(8);
      } else if (window.innerWidth >= 320) {
        setDisplayCount(5);
      }
    }

    handleResize(); // Установка начального значения при загрузке
    window.addEventListener("resize", handleResize); // Слушаем изменения размера окна

    return () => {
      window.removeEventListener("resize", handleResize); // Удаляем слушатель при размонтировании
    };
  }, [dataMovies]);

  const handleShowMore = () => {
    const additionalCount =
      window.innerWidth >= 320 && window.innerWidth <= 720
        ? 2
        : window.innerWidth <= 1170
        ? 2
        : 3; // Количество карточек для загрузки
    setDisplayCount(displayCount + additionalCount);
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {dataMovies &&
          location.pathname === "/movies" &&
          dataMovies
            .slice(0, displayCount)
            .map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isLiked={isMovieInSavedMovies(movie)}
                setDataMovies={setDataMovies}
                dataMovies={dataMovies}
                dataSavedMovies={dataSavedMovies}
                setDataSavedMovies={setDataSavedMovies}
                shortDataSavedMovies={shortDataSavedMovies}
                setShorDataSavedMovies={setShorDataSavedMovies}
              />
            ))}
            {dataMovies &&
          location.pathname === "/saved-movies" &&
          dataMovies
            .map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isLiked={isMovieInSavedMovies(movie)}
                setDataMovies={setDataMovies}
                dataMovies={dataMovies}
                dataSavedMovies={dataSavedMovies}
                setDataSavedMovies={setDataSavedMovies}
                shortDataSavedMovies={shortDataSavedMovies}
                setShorDataSavedMovies={setShorDataSavedMovies}
              />
            ))}
      </ul>
      {dataMovies && dataMovies.length > displayCount && (
        location.pathname === "/movies" &&
        <button
          className="movies-card-list__button-more"
          onClick={handleShowMore}
          
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
