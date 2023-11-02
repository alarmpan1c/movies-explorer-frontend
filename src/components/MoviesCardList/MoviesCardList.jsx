import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList() {
    
return (
    <section className="movies-card-list">
        <ul className="movies-card-list__list">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
        </ul>
        <button className="movies-card-list__button-more">Ещё</button>
    </section>
);
}

export default MoviesCardList;