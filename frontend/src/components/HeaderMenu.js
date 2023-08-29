import React from "react";
import { Link } from "react-router-dom";

export default function HeaderMenu(props) {
  function onLogout() {
    localStorage.removeItem('token');
  }

  return (
    <nav className="header__menu">
      {props.name === 'homePage'
          ? <ul className="header__list">
              <li className="header__item">
                <Link to={`mailto:${props.userEmail}`} className="header__link">{props.userEmail}</Link>
              </li>
              <li className="header__item">
                <Link to={'/sign-in'} onClick={onLogout} className="header__link">Выйти</Link>
              </li>
            </ul>
          : props.name === 'signup'
            ? <ul className="header__list">
                <li className="header__item">
                  <Link to={'/sign-in'} className="header__link">Войти</Link>
                </li>
              </ul>
            : <ul className="header__list">
                <li className="header__item">
                  <Link to={'/sign-up'} className="header__link">Регистрация</Link>
                </li>
              </ul>
        }
    </nav>
  )
}
