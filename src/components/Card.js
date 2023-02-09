import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    };

    const handleDeleteClick = () => {
        props.onBtnDelete(props.card);
    };

    const handleClick = () => {
        props.onCardClick(props.card);
    };

    const currentUserData = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUserData._id;

    const cardDeleteButtonClassName =`element__delete-button`;

    const isLiked = props.card.likes.some(i => i._id === currentUserData._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    const DeleteBtn = isOwn ? (<button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName} name="delete" value="delete"></button>) : (' ')

    return (
        <div className="element">
            <img onClick={handleClick} className="element__image" src={props.card.link} alt={props.card.title} />
            {DeleteBtn}
            <div className=" element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__container-likes">
                    <button aria-label="Лайк" type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} name="like"
                        value="like"></button>
                    <p className="element__sum-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;