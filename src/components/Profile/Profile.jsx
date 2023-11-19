import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../context/CurrentUserContexts";
import { useFormValidation } from "../../utils/helpers";

import "./Profile.css";

function Profile({ logout, editProfile, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const [isEdited, setIsEdited] = useState(false);
  
  const { values, handleChange, errors, isValid, clearForm } =
    useFormValidation({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile(values);
  };

  const checkIsEdited = (e) => {
    handleChange(e);
  };

  useEffect(() => {
    clearForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });
  }, [clearForm, currentUser, isLoggedIn]);

  useEffect(() => {
    setIsEdited((prevIsEdited) => {
      return values.name !== currentUser.name || values.email !== currentUser.email;
    });
  }, [values]);

  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="profile__title">{`Привет, ${
          currentUser.name || ""
        }!`}</h1>
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
                placeholder={currentUser.name || ""}
                minLength="2"
                maxLength="30"
                required
                onChange={checkIsEdited}
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
                placeholder={currentUser.email || ""}
                minLength="2"
                maxLength="30"
                required
                onChange={checkIsEdited}
                value={values?.email || ""}
              />
            </label>
            <span className="profile__input-error">{errors.email ?? ""}</span>
          </div>
        </form>
        <div className="profile__buttons-container">
          <button
            className={`profile__button-edit ${
              (!isValid || !isEdited) && "profile__button-edit_disabled"
            }`}
            type="submit"
            form="profile_form"
            disabled={!isValid || !isEdited}
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
