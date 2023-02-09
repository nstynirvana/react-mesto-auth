import React from "react";

function ImagePopup(props) {
    
    return (
            <div className={`popup popup-visual popup_open-image ${props.card.link ? 'popup_opened' : ''}`}>
                <div className="popup-visual__review">
                    <button onClick={props.onClose} aria-label="Закрыть" type="button" className="popup__close-button"></button>
                    <img src={props.card.link} alt={props.card.name} className="popup-visual__image" />
                    <h2 className="popup-visual__text">{props.card.name}</h2>
                </div> 
            </div>
    );
}

export default ImagePopup;
