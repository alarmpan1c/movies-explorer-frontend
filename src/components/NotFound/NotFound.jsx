import './NotFound.css';

function NotFound() {
    
return (
    <main className="not-found">
        <div className="not-found__container">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
        </div>
        <button className="not-found__button" type="button">Назад</button>
    </main>
);
}

export default NotFound;