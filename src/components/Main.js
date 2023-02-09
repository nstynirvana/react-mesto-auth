import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUserData = React.useContext(CurrentUserContext); 
   
    
    return (
        <>
            <main className="content">

                <section className="profile">
                    <button onClick={props.onEditAvatar} className="profile__image-edit-button">
                        <img src={currentUserData.avatar} className="profile__image" alt="Аватар пользователя" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__person">
                            <h1 className="profile__title">{currentUserData.name}</h1>
                            <button onClick={props.onEditProfile} aria-label="Редактировать" type="button" className="profile__edit-button" name="edit" value="edit"></button>
                        </div>
                        <p className="profile__subtitle">{currentUserData.about}</p>
                    </div>
                    <button onClick={props.onAddPlace} aria-label="Добавить" type="button" className="profile__add-button" name="add"></button>
                </section>

                <section className="elements">
                    {props.cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onBtnDelete={props.onBtnDelete}/>
                ))}
                </section>

            </main>
        </>
    );
}

export default Main;
