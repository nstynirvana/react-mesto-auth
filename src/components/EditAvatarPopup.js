import React from "react";
import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = useRef();

     const clearAvatar = () => {
        avatarRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
            clearAvatar
        });
    };
    
    React.useEffect(() => {
    }, [props.isOpen]);

    return (
        <>
            <PopupWithForm textOfButton="Сохранить" name="updateAvatar" title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} noValidate>
                <input type="url" className="popup__text popup__text_type_image" required id="avatar" placeholder="Ссылка на картинку" name="avatar" ref={avatarRef} />
                <span className="error"></span>
            </PopupWithForm>
        </>
    )
}

export default EditAvatarPopup
