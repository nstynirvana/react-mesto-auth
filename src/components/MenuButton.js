import React from "react";

function MenuButton(props) {
  return (
    <div className="button" onClick={props.handleMenuClick}>
      <span
        className={`button__menu ${
          props.isMenuLogged ? "button__menu_left" : ""
        }`}
      />
      <span
        className={`button__menu ${
          props.isMenuLogged ? "button__menu_hidden" : ""
        }`}
      />
      <span
        className={`button__menu ${
          props.isMenuLogged ? "button__menu_right" : ""
        }`}
      />
    </div>
  );
}

export default MenuButton;
