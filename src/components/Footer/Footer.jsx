import './Footer.css';

function Footer() {
    
return (
    <footer className="footer">
        <div className="footer__container">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__info">
                <p className="footer__copyright">&copy; 2023</p>
                <ul className="footer__links">
                    <li>
                        <a className="footer__link" title="Яндекс.Практикум" target="_blank" rel="noreferrer" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a className="footer__link" title="Github" target="_blank" rel="noreferrer" href="https://github.com/alarmpan1c">Github</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
);
}

export default Footer;