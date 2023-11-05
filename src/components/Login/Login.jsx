import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

import './Login.css';


function Login() {
    
return (
    <main className="login">
        <section className="login__section">
            <div className="login__container">
                <Link to="/" className="login__link-logo">
                    <img src={logo} alt="Логотип" className="login__logo" />
                </Link>
                <h1 className="login__title">Рады видеть!</h1>
            </div>
            <form className="login__form" name="login">
                <div className="login__input-container">
                    <label className="login__label">
                        <span className="login__label-input">E-mail</span>
                        <input
                            className="login__input"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            minLength="2"
                            maxLength="30"
                            required
                        />
                    </label>
                    <label className="login__label">
                        <span className="login__label-input">Пароль</span>
                        <input
                            className="login__input"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="30"
                            required
                        />
                    </label>
                </div>
            </form>
            <div className="login__buttons-container">
                <button className="login__button" type="submit">Войти</button>
            <span className="login__text">Ещё не зарегистрированы?<Link to="/signup" className="login__link">Регистрация</Link></span>
            </div>
        </section>
    </main>
);
}

export default Login;
