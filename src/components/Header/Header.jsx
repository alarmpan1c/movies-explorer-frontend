import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useState, useEffect } from 'react';
import './Header.css';

import logo from '../../images/logo.svg';

function Header({ isLoggedIn, openMenu }) {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
return (
    <header className="header">
        {/* <h1 className="header__title">{windowSize.innerWidth}x{ windowSize.innerHeight}</h1> */}
    { isLoggedIn && windowSize.innerWidth > 768 && <nav className="header__container">
        <Link to="/" className="header__link">
            <img src={logo} alt="Логотип" className="header__logo"/>
        </Link>
        <Navigation />
        <Link to="/profile" className="header__button-link">Аккаунт</Link>
    </nav>}
    { isLoggedIn && windowSize.innerWidth <= 768 && <nav className="header__container">
        <Link to="/" className="header__link">
            <img src={logo} alt="Логотип" className="header__logo"/>
        </Link>
        <button className="header__button-menu" type="button" onClick={openMenu}></button>
    </nav>}
    {!isLoggedIn && <nav className="header__container">
        <Link to="/" className="header__link">
            <img src={logo} alt="Логотип" className="header__logo"/>
        </Link>
        <ul className="header__list">
            <li className="header__register"><Link to="/signup" className="header__register-link">Регистрация</Link></li>
            <li className="header__login"><Link to="/signin" className="header__login-link">Войти</Link></li>
        </ul>
    </nav>}
    </header>
);
}

export default Header;
