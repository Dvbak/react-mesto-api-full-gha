import React from 'react';
import btnClosePopup from '../images/icon/close_icon.svg';
import Forms from './Forms';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_overlay_middle popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <Forms
            name = {props.name}
            titleBtn = {props.titleBtn}
            onSubmit = {props.onSubmit}
            children = {props.children}
            isDemand = {props.isDemand}
          />
          <button className="popup__closed" type="button"
          onClick={props.onClose}>
            <img
              src={btnClosePopup}
              alt="закрыть всплывающее окно"
              className="popup__pic-closed"
            />
          </button>
        </div>
      </div>
  )
}

export default PopupWithForm;
