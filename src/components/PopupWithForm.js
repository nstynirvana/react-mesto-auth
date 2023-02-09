import React from "react";

function PopupWithForm(props) {

    return (
        <>
            <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__content">
                    <button onClick={props.onClose} className="popup__close-button" type='button' aria-label="Закрыть"></button>
                    <form className={`form form_type_${props.name}`} name={``} onSubmit={props.onSubmit} noValidate>
                        <h2 className="popup__heading">{`${props.title}`}</h2>
                        {props.children}
                        <button className="popup__submit-button" type="submit">{`${props.textOfButton}`}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PopupWithForm;

