import React from "react";
import imageSuccess from '../images/image-success.svg'
import imageError from '../images/image-error.svg'

function InfoToolTip(props) {

  return (
    <>
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
        <div className='popup__content'>
          <button className='popup__close-button link' type='button' aria-label='Закрыть форму' onClick={props.onClose}></button>
          <div className="popup__result result">
            <img className="result__image" src={props.isSuccess ? imageSuccess : imageError} alt={props.isSuccess ? 'Успешный результат' : 'Отрицательный результат'} />
            <p className="result__text">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoToolTip