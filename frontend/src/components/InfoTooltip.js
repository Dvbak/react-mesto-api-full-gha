import React from "react";
import btnClosePopup from '../images/icon/close_icon.svg';
import imgSuccess from '../images/Union.svg';
import imgError from '../images/Union_error.svg';


export default function InfoTooltip(props) {
  return (
    <div className={`popup popup_overlay_middle popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__tooltipinner">
          {props.isSuccess
            ? <img
            src={imgSuccess}
            alt="успешная регистрация"
            className="popup__imgreg"/>
            : <img
            src={imgError}
            alt="ошибка"
            className="popup__imgreg"/>
          }
          {props.isSuccess
            ? <h2 className="popup__subtitle">Вы успешно зарегистрировались!</h2>
            : <h2 className="popup__subtitle">Что-то пошло не так!
            Попробуйте ещё раз.</h2>
          }
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
