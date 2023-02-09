import React from "react";
import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const titleRef = useRef();
    const linkRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: titleRef.current.value,
            link: linkRef.current.value,
        });
    }

    React.useEffect(() => {
    }, [props.isOpen]);

    return (
        <>
            <PopupWithForm textOfButton="Создать" name="formAdd" title='Новое место' isOpen={props.isOpen} onClose={props.onClose}  onSubmit={handleSubmit} noValidate>
                <input ref={titleRef} type="text" className="popup__text popup__text_type_title" required id="place-title" placeholder="Название" name="title" minLength="2" maxLength="30" />
                <span className="form__error image-subtitle-error"></span>
                <input ref={linkRef} type="url" className="popup__text popup__text_type_image" required id="place-img-link" placeholder="Ссылка на картинку" name="link" />
                <span className="form__error image-link-error"></span>
            </PopupWithForm>
        </>
    )
}

export default AddPlacePopup
