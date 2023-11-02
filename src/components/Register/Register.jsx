import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

import './Register.css';


function Register() {
    
return (
    <main className="register">
        <div className="signup">
            <Link to="/" className="register__link">
                <img src={logo} alt="Логотип" className="register__logo" />
            </Link>
            <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form className="register__form" name="register" noValidate>
            <div className="register__input-container">
                <label className="register__label">
                    <span className="register__label-input">Имя</span>
                    <input
                        className="register__input"
                        type="text"
                        name="name"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                </label>
                <label className="register__label">
                    <span className="register__label-input">E-mail</span>
                    <input
                        className="register__input"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        required
                    />
                </label>
                <label className="register__label">
                    <span className="register__label-input">Пароль</span>
                    <input
                        className="register__input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                    />
                    <span className="register__error">Что-то пошло не так...</span>
                </label>
            </div>
        </form>
        <div className="register__buttons">
            <button className="register__button-submit" type="submit">Зарегистрироваться</button>
            <span className="register__text">Уже зарегистрированы?<Link to="/signin" className="register__text-link">Войти</Link></span>
        </div>
    </main>
);
}

export default Register;
