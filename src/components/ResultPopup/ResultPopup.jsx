import "./ResultPopup.css";

function ResultPopup({ isOpen, onClose, lucky, title }) {
  return (
    <div className={`popup-res ${isOpen && "popup-res_opened"}`}>
      <div className="popup-res__container">
        <h2 className="popup-res__title">{title}</h2>
        <img className="popup-res__image" src={lucky} alt="Успех" />
        <button
          className="popup-res__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ResultPopup;
