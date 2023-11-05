import { Link } from 'react-router-dom';

import './Profile.css';


function Profile() {
    
return (
    <main className="profile">
        <section className="profile__container">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form className="profile__form" name="profile">
                <div className="profile__input-container">
                    <label className="profile__label">
                        <span className="profile__label-input">Имя</span>
                        <input
                            className="profile__input"
                            type="text"
                            name="name"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="30"
                            required
                        />
                    </label>
                    <label className="profile__label">
                        <span className="profile__label-input">E-mail</span>
                        <input
                            className="profile__input"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            minLength="2"
                            maxLength="30"
                            required
                        />
                    </label>
                </div>
            </form>
            <div className="profile__buttons-container">
                <button className="profile__button-edit" type="submit">Редактировать</button>
                <Link to="/" className="profile__link">Выйти из аккаунта</Link>
            </div>
        </section>
    </main>
);
}

export default Profile;
