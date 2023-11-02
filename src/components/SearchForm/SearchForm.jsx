import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm() {
    
return (
    <section className="search">
        <div className="search__container">
            <form className="search__form" name="search">
                <input
                    className="search__input"
                    type="text"
                    name="search"
                    placeholder="Фильм"
                    required
                />
                <button className="search__button" type="submit"></button>
            </form>
            <FilterCheckbox />
        </div>
    </section>
);
}

export default SearchForm;