import React from "react";
import headerLogo from "../images/header-logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header(props) {
  function signOut() {
    props.signOutProfile();
    props.closeAllPopups();
  }

  return (
    <>
      {props.isMenuLogged && (
        <div className="header__container header__container_type_burger-menu">
          {props.isLoggedIn ? (
            <p className="header__user">{props.useremail}</p>
          ) : (
            ""
          )}
          <Link
            to="/sign-in"
            className="header__link-push link"
            onClick={signOut}
          >
            Выйти
          </Link>
        </div>
      )}

      <header className="header__container header">
        <Link to="/">
          <img src={headerLogo} alt="Логотип" />
        </Link>

        <Routes>
          <Route
            path="/"
            element={
              <div className="header__container header__container_type_profile-menu">
                <p className="header__user">{props.useremail}</p>
                <Link
                  to="/sign-in"
                  className="header__link-push"
                  onClick={signOut}
                >
                  Выйти
                </Link>
              </div>
            }
          ></Route>

          <Route
            path="/sign-up"
            element={
              <div className="header__container">
                <Link
                  to="/sign-in"
                  className="header__link-push"
                  onClick={signOut}
                >
                  Войти
                </Link>
              </div>
            }
          ></Route>

          <Route
            path="/sign-in"
            element={
              <div className="header__container">
                <Link
                  to="/sign-up"
                  className="header__link-push link header__link-push_color_grey"
                  onClick={signOut}
                >
                  Регистрация
                </Link>
              </div>
            }
          ></Route>
        </Routes>
      </header>
    </>
  );
}

export default Header;
