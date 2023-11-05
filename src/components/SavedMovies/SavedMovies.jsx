import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';
function SavedMovies() {
    
return (
    <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
        <div className="saved-movies__container">
        </div>
    </main>
);
}

export default SavedMovies;
