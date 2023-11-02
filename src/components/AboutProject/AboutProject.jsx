import './AboutProject.css';
function AboutProject() {
    
return (
    <section className="about-project" id="about">
        <div className="about-project__container">
            <h2 className="about-project__title">О проекте</h2>
            <ul className="about-project__descrip-list">
                <li className="about-project__descrip-item">
                    <h3 className="about-project__descrip-title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__descrip-text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </li>

                <li className="about-project__descrip-item">
                    <h3 className="about-project__descrip-title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__descrip-text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <div className="about-project__time">
                <div className="about-project__backend">
                    <span className="about-project__backend-time">1 неделя</span>
                    <span className="about-project__step">Back-end</span>
                </div>
                <div className="about-project__frontend">
                    <span className="about-project__frontend-time">4 недели</span>
                    <span className="about-project__step">Front-end</span>
                </div>
            </div>
        </div>
    </section>
);
}

export default AboutProject;