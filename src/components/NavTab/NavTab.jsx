import './NavTab.css';
function NavTab() {
    
return (
    <nav className="nav">
        <ul className="nav__links">
            <li className="nav__link"><a className="nav__anchor" href="#about">О проекте</a></li>
            <li className="nav__link"><a className="nav__anchor" href="#techs">Технологии</a></li>
            <li className="nav__link"><a className="nav__anchor" href="#about-me">Студент</a></li>
        </ul>
    </nav>
);
}

export default NavTab;