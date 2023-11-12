import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../context/CurrentUserContexts";
import { useFormValidation } from "../../utils/helpers";

import "./Profile.css";

function Profile({ logout, editProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, clearForm } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    editProfile(values);
  };

  useEffect(() => {
    clearForm();
  }, [clearForm]);

  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form
          className="profile__form"
          name="profile"
          id="profile_form"
          onSubmit={handleSubmit}
        >
          <div className="profile__input-container">
            <label className="profile__label">
              <span className="profile__label-input">Имя</span>
              <input
                className="profile__input"
                type="text"
                name="name"
                placeholder={`${currentUser.name}`}
                minLength="2"
                maxLength="30"
                required
                onChange={handleChange}
                value={values?.name || ""}
              />
            </label>
            <span className="profile__input-error">{errors.name ?? ""}</span>
            <label className="profile__label">
              <span className="profile__label-input">E-mail</span>
              <input
                className="profile__input"
                type="email"
                name="email"
                placeholder={`${currentUser.email}`}
                minLength="2"
                maxLength="30"
                required
                onChange={handleChange}
                value={values?.email || ""}
              />
            </label>
            <span className="profile__input-error">{errors.email ?? ""}</span>
          </div>
        </form>
        <div className="profile__buttons-container">
          <button
            className={`profile__button-edit ${
              !isValid && "profile__button-edit_disabled"
            }`}
            type="submit"
            form="profile_form"
            disabled={!isValid}
          >
            Редактировать
          </button>
          <Link to="/" className="profile__link" onClick={logout}>
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Profile;
