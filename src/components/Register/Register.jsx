import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormValidation } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import { useEffect } from "react";

function Register({ onRegister, isLoggedIn }) {
  const { values, handleChange, errors, isValid, clearForm } =
    useFormValidation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
  });

  useEffect(() => {
    clearForm();
  }, [clearForm]);

  return (
    <main className="register">
      <section className="register__container">
        <div className="signup">
          <Link to="/" className="register__link">
            <img src={logo} alt="Логотип" className="register__logo" />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form
          className="register__form"
          name="register"
          id="register"
          onSubmit={handleSubmit}
        >
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
                onChange={handleChange}
                value={values?.name || ""}
              />
              <span className="register__error">{errors.name ?? ""}</span>
            </label>
            <label className="register__label">
              <span className="register__label-input">E-mail</span>
              <input
                className="register__input"
                type="email"
                name="email"
                placeholder="E-mail"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChange}
                value={values?.email || ""}
              />
              <span className="register__error">{errors.email ?? ""}</span>
            </label>
            <label className="register__label">
              <span className="register__label-input">Пароль</span>
              <input
                className="register__input"
                type="password"
                name="password"
                placeholder="Пароль"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChange}
                value={values?.password || ""}
              />
              <span className="register__error">{errors.password ?? ""}</span>
            </label>
          </div>
        </form>
        <div className="register__buttons">
          <button
            className={`register__button-submit ${
              !isValid && "register__button-submit_disabled"
            }`}
            type="submit"
            form="register"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
          <span className="register__text">
            Уже зарегистрированы?
            <Link to="/signin" className="register__text-link">
              Войти
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
}

export default Register;
