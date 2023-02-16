import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AuthorizeForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setPassword(currentUser.password);
    }
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(email, password);
  };

  return (
    <form
      className="form form_color_white"
      name="sign-in"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form__title form__title_place_sign-in">{props.title}</h2>
      <div className="form__items form__items_color_white">
        <input
          className="form__item form__item_color_white"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleUserEmail}
          required
        />
        <input
          className="form__item form__item_color_white"
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleUserPassword}
          required
        />
      </div>
      <button className="form__button form__button_color_white" type="submit">
        {props.textOfButton}
      </button>
    </form>
  );
}

export default AuthorizeForm;
