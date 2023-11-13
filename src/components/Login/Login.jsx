import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormValidation } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { useEffect } from "react";

function Login({ onLogin, isLoggedIn }) {
  const { values, handleChange, errors, isValid, clearForm } =
    useFormValidation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
  });

  useEffect(() => {
    clearForm();
  }, [clearForm]);

  return (
    <main className="login">
      <section className="login__section">
        <div className="login__container">
          <Link to="/" className="login__link-logo">
            <img src={logo} alt="Логотип" className="login__logo" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form
          className="login__form"
          id="login"
          name="login"
          onSubmit={handleSubmit}
        >
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
                onChange={handleChange}
                value={values?.email || ""}
              />
              <span className="login__error">{errors.email ?? ""}</span>
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
                onChange={handleChange}
                value={values?.password || ""}
              />
              <span className="login__error">{errors.password ?? ""}</span>
            </label>
          </div>
        </form>
        <div className="login__buttons-container">
          <button
            className={`login__button ${
              !isValid && "login__button_disabled"
            }`}
            form="login"
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
          <span className="login__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link">
              Регистрация
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
}

export default Login;
