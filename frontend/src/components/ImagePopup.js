import React from 'react';
import btnClosePopup from '../images/icon/close_icon.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup_overlay_dark popup_img ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__inner">
        <figure className="popup__figure">
          <img
            src={props.card.link ? props.card.link : '#'}
            alt={props.card.name ? props.card.name : '#'}
            className="popup__image"
          />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__closed" type="button" onClick={props.onClose}>
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

export default ImagePopup;
