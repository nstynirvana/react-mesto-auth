import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoTooltip";
import auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [email, setEmail] = React.useState("");

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);

  const [isSuccess, setSuccess] = React.useState(false);

  const [isMenuLogged, setMenuLogged] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .setCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((i) => (i._id === card._id ? newCard : i))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((i) => (i._id === card._id ? newCard : i))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCardDelete = (card) => {
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoToolTipOpen ||
    selectedCard.link;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setInfoToolTipOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleMenuClick() {
    setMenuLogged(!isMenuLogged);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleUserEmail(email) {
    setEmail(email);
  }

  const handleUpdateUser = (info) => {
    api
      .editUserInfo(info)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateAvatar = ({ avatar, clearAvatar }) => {
    api
      .editUserAvatar({ avatar })
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar });
        closeAllPopups();
        clearAvatar();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleAddPlaceSubmit(card) {
    console.log(card);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setInfoToolTipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setMenuLogged(false);
  }

  const handleRegisterSubmit = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setSuccess(true); //сообщение об успешной регистраци
          navigate("/sign-in");
        }
      })
      .catch(() => {
        handleInfoTooltipClick();
        setSuccess(false);
      })
      .finally(() => {
        handleInfoTooltipClick();
      });
  };

  function handleLoginSubmit(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleUserEmail(email);
          localStorage.setItem("token", data.token); //сохранили токен
          handleLogin(); //статус пользователя - зарегистрирован
          navigate("/"); //переадресация на основную страницу
        } else {
          return;
        }
      })
      .catch(() => {
        handleInfoTooltipClick(); //открытие модального окна с ошибкой
        setSuccess(false);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token"); //сохранили токен
    if (token) {
      auth
        .getContent(token)
        .then((data) => data)
        .then((res) => {
          handleUserEmail(res.data.email);
          handleLogin(); //обновлен статус пользователя - зарегистрирован
          navigate("/"); //переадресация на страницу пользователя
        })
        .catch((err) => console.log(err));
    }
  }

  function signOutProfile() {
    localStorage.removeItem("token"); //удалили токен
    setLoggedIn(false); // обновили статус пользователя
    navigate("/sign-in"); //переадресация на странцицу входа
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          signOutProfile={signOutProfile}
          useremail={email}
          isLoggedIn={isLoggedIn}
          closeAllPopups={closeAllPopups}
          isMenuLogged={isMenuLogged}
          handleMenuClick={handleMenuClick}
        />

        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onBtnDelete={handleCardDelete}
              />
            }
          ></Route>

          <Route
            path="/sign-up"
            element={
              <Register
                title="Регистрация"
                textOfButton="Зарегистрироваться"
                onRegister={handleRegisterSubmit}
              />
            }
          ></Route>

          <Route
            path="/sign-in"
            element={
              <Login
                title="Войти"
                textOfButton="Войти"
                onLogin={handleLoginSubmit}
              />
            }
          ></Route>
        </Routes>

        <Footer />

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
