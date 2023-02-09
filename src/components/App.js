import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';
import {useScrollLock} from '../hooks/useScrollLock'

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({});

    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getAllCards()
            .then((cards) => {
                setCards(cards);

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch(err => console.log(err))
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.setCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((i) => i._id === card._id ? newCard : i));
                })
                .catch(err => console.log(err));
        }
        else {
            api.deleteCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((i) => i._id === card._id ? newCard : i));
                })
                .catch(err => console.log(err))
        }
    }

    const handleCardDelete = (card) => {
        console.log(card)
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter(i => i._id !== card._id));
                closeAllPopups()
            })
            .catch(err => console.log(err))
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleUpdateUser = (info) => {
        api.editUserInfo(info)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleUpdateAvatar = ({ avatar, clearAvatar }) => {
        api.editUserAvatar({ avatar })
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
        console.log(card)
        api.addNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(false);
    }

    const handleRegisterSubmit = (email, password) => {
        auth.register(email, password)
        .then((res) => {
          if(res) {
            handleInfoTooltipClick(); //открытие модального окна
            setSuccess(true); //сообщение об успешной регистраци
            history.push('/sign-in');
          } else {
            handleInfoTooltipClick(); //открытие модального окна
            setSuccess(false); //сообщение о проблеме при регистраци
          }
        })
        .catch((err) => console.log(err));
      };

      function handleLoginSubmit (email, password) {
        auth.authorize(email, password)
          .then((data) => {
            if(data.token) {
              handleUserEmail(email); //сохранили эл. почту пользователя в стейт
              localStorage.setItem('token', data.token);//сохранили токен
              handleLogin();//статус пользователя - зарегистрирован
              history.push('/'); //переадресация на основную страницу
            } else {
              return
            }
          })
          .catch(() => {
            handleInfoTooltipClick(); //открытие модального окна с ошибкой
            setSuccess(false);
          })
      }

    return (

        <div className="page">

            <CurrentUserContext.Provider value={currentUser}>

                <Header />

                <Switch>
                    <Route path='/sign-up'>
                        <Register title='Регистрация' textOfButton='Зарегистрироваться' onRegister={handleRegisterSubmit} />
                    </Route>

                    <Route path='/sign-in'>
                        <Login title='Войти' textOfButton='Войти' onLogin={handleLoginSubmit} />
                    </Route>
                </Switch>


                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onBtnDelete={handleCardDelete}
                />

                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <div className="popup popup_delete">
                    <div className="popup__content">
                        <button aria-label="Закрыть" id="editBtnDelete" type="button" className="popup__close-button popup__close-button_edit"></button>
                        <h2 className="popup__heading">Вы уверены?</h2>
                        <button aria-label="Сохранить" id="consent" className="popup__submit-button">Да</button>
                    </div>
                </div>

            </CurrentUserContext.Provider>

        </div>
    );
}

export default App;
