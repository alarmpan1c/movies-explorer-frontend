import NavTab from '../NavTab/NavTab';
import './Promo.css';
function Promo() {
    
return (
    <section className="promo">
        <div className="promo__container">
            <div className="promo__banner">
                <h1 className="promo__title">
                Учебный проект студента факультета Веб&#8209;разработки.
                </h1>
                <NavTab />
            </div>
        </div>
    </section>
);
}

export default Promo;