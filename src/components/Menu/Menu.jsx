import { Link, NavLink } from 'react-router-dom';
import './Menu.css';
function Menu({ isOpen, onClose }) {

return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <ul className="popup__list">
                <li className="popup__item"><NavLink to="/" onClick={onClose} className={({ isActive }) => isActive ? "popup__link_active" : "popup__link"}>Главная</NavLink></li>
                <li className="popup__item"><NavLink to="/movies" onClick={onClose} className={({ isActive }) => isActive ? "popup__link_active" : "popup__link"}>Фильмы</NavLink></li>
                <li className="popup__item"><NavLink to="/saved-movies" onClick={onClose} className={({ isActive }) => isActive ? "popup__link_active" : "popup__link"}>Сохраненные фильмы</NavLink></li>
            </ul>
            <div className="popup__account">
                <Link to="/profile" onClick={onClose} className="popup__button-account" type="button" aria-label="Аккаунт">Аккаунт</Link>
            </div>
            <button
                className="popup__button-close"
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
            />
        </div>
    </div>
);
}

export default Menu;
