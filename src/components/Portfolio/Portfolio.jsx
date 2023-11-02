import './Portfolio.css';

function Portfolio() {
    
return (
    <section className="portfolio">
        <div className="portfolio__container">
            <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__descrip-list">
                    <li className="portfolio__descrip-item">
                        <a
                            className="portfolio__link-item"
                            href="https://github.com/alarmpan1c/how-to-learn"
                            title="How to learn"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Статичный сайт
                        </a>
                    </li>
                    <li className="portfolio__descrip-item">
                        <a
                            className="portfolio__link-item"
                            href="https://github.com/alarmpan1c/russian-traveling"
                            title="Russian travel"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Адаптивный сайт
                        </a>
                    </li>
                    <li className="portfolio__descrip-item">
                        <a 
                            className="portfolio__link-item"
                            href="https://github.com/alarmpan1c/react-mesto-api-full-gha"
                            title="Mesto"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Одностраничное приложение
                        </a>
                    </li>
                </ul>
        </div>
    </section>
);
}

export default Portfolio;
