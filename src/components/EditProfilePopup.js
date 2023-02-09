import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <>
            <PopupWithForm textOfButton="Сохранить" name="formEdit" title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} noValidate>
                <input type="text" value={name} onChange={handleChangeName} className="popup__text popup__text_type_name" id="name" required placeholder="Имя" name="name" minLength="2" maxLength="40" />
                <span className="error"></span>
                <input type="text" value={description} onChange={handleChangeDescription} className="popup__text popup__text_type_job" id="about" required placeholder="О себе" name="about" minLength="2" maxLength="200" />
                <span className="error"></span>
            </PopupWithForm>
        </>
    );
}

export default EditProfilePopup

