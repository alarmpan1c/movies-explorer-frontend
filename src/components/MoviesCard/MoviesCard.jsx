import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatMinutes } from "../../utils/helpers";

import "./MoviesCard.css";

function MoviesCard({ movie, saveMovie, deleteMovie, isLiked }) {
  const [isLike, setIsLike] = useState(isLiked);
  const location = useLocation();
  const [buttonClass, setButtonClass] = useState("");

  const handleLike = () => {
    console.log("isDislike", isLike);
    if (isLike) {
      console.log(movie);
      deleteMovie(movie);
      setIsLike(false);
    } else {
      console.log("isLike", isLike);
      saveMovie(movie);
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
            ("https://api.nomoreparties.co" + (movie.image.url || movie.image))
          }
          alt="Кадр из фильма"
          onMouseEnter={() => setButtonClass("movies-card__button_visible")}
          onMouseLeave={() => setButtonClass("")}
        />
      </Link>
      {!isLike && (
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
      {location.pathname === "/movies" && isLike && (
        <button
          className="movies-card__button-saved"
          onClick={() => handleLike()}
        ></button>
      )}
      {location.pathname === "/saved-movies" && isLike && (
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
