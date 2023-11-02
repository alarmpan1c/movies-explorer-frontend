import picCard from '../../images/pic-card.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard() {
    const [isLike, setIsLike] = useState(Math.random() > 0.5);
    const location = useLocation();
    const [buttonClass, setButtonClass] = useState("");
return (
    <li className="movies-card">
        <img className="movies-card__image" src={picCard} alt="Кадр из фильма" onMouseOver={() => setButtonClass('movies-card__button_visible')} onMouseOut={() => setButtonClass("")}/>
        {!isLike && <button className={`movies-card__button ${buttonClass}`} onClick={() => setIsLike(true)} onMouseOut={() => setButtonClass("")}>Сохранить</button>}
        <div className="movies-card__info">
            <p className="movies-card__title">33 слова о дизайне</p>
            <span className="movies-card__time">1ч 17м</span>
        </div>
            {location.pathname === "/movies" && isLike && <button className="movies-card__button-saved"></button>}
            {location.pathname === "/saved-movies" && isLike && <button className={`movies-card__button-delete ${buttonClass}`} onMouseOut={() => setButtonClass("")}></button>}
    </li>
);
}

export default MoviesCard;