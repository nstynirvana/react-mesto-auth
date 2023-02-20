import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      textOfButton="Создать"
      name="formAdd"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeTitle}
        value={title}
        type="text"
        className="popup__text popup__text_type_title"
        required
        id="place-title"
        placeholder="Название"
        name="title"
        minLength="2"
        maxLength="30"
      />
      <span className="form__error image-subtitle-error"></span>
      <input
        onChange={handleChangeLink}
        value={link}
        type="url"
        className="popup__text popup__text_type_image"
        required
        id="place-img-link"
        placeholder="Ссылка на картинку"
        name="link"
      />
      <span className="form__error image-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
