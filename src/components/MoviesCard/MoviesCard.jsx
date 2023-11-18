import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatMinutes } from "../../utils/helpers";

import "./MoviesCard.css";

function MoviesCard({
  movie,
  saveMovie,
  deleteMovie,
  isLiked,
  setDataMovies,
  dataMovies,
  dataSavedMovies,
  setDataSavedMovies,
}) {
  const [isLike, setIsLike] = useState(isLiked);
  const location = useLocation();
  const [buttonClass, setButtonClass] = useState("");

  console.log(movie); 
  console.log(!isLike && movie.nameRU !== "Ничего не найдено");
  console.log(movie.nameRU === "Ничего не найдено");
  console.log(movie.nameRU);
  console.log('Ничего не найдено' !== "Ничего не найдено");

  const handleLike = () => {
    if (isLike) {
      deleteMovie(movie);
      setIsLike(false);
    } else {
      saveMovie(movie, setDataSavedMovies, dataSavedMovies);
      setIsLike(true);
    }
  };
  return (
    <li className="movies-card">
      <Link to={movie.trailerLink} target="_blank">
        <img
          className="movies-card__image"
          src={
            movie.notFound ||
            "https://api.nomoreparties.co" + (movie.image?.url || movie.image)
          }
          alt="Кадр из фильма"
          onMouseEnter={() => setButtonClass("movies-card__button_visible")}
          onMouseLeave={() => setButtonClass("")}
        />
      </Link>
      {!isLike && movie.nameRU !== "Ничего не найдено" && (
        <button
          className={`movies-card__button ${buttonClass}`}
          onClick={() => handleLike()}
          onMouseEnter={() => setButtonClass("movies-card__button_visible")}
        >
          Сохранить
        </button>
      )}
      <div className="movies-card__info">
        <p className="movies-card__title">{movie.nameRU}</p>
        <span className="movies-card__time">
          {formatMinutes(movie.duration)}
        </span>
      </div>
      {location.pathname === "/movies" && isLike && movie.nameRU !== "Ничего не найдено" && (
        <button
          className="movies-card__button-saved"
          onClick={() => handleLike()}
        ></button>
      )}
      {location.pathname === "/saved-movies" && isLike && movie.nameRU !== "Ничего не найдено" && (
        <button
          className={`movies-card__button-delete ${buttonClass}`}
          onMouseEnter={() => setButtonClass("movies-card__button_visible")}
          onClick={() => handleLike()}
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
