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
        api.editUserAvatar({avatar})
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

    return (

        <div className="page">

            <CurrentUserContext.Provider value={currentUser}>

                <Header />

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

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}  onAddPlace={handleAddPlaceSubmit}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

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
