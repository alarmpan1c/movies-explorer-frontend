import authorPic from '../../images/pic-author.png';

import './AboutMe.css';

function AboutMe() {
    
return (
    <section className="about-me" id="about-me">
        <div className="about-me__container">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__info-container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__prof">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и&#160;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал&#160;кодить. С&#160;2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className="about-me__link" href="https://github.com/alarmpan1c" title="GitHub" target="_blank" rel="noreferrer">GitHub</a>
                </div>
                <img 
                    className="about-me__photo"
                    src={authorPic}
                    alt="Фото Виталия" />
            </div>
        </div>
    </section>
);
}

export default AboutMe;