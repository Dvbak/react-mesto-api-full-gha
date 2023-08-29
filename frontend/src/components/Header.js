import React from 'react';
import logo from '../images/logo/logo.svg';
import HeaderMenu from './HeaderMenu';

function Header(props) {
  return (
    <header className="header page__center">
      <img
        src={logo}
        alt="логотип"
        className="header__logo"
      />
      <HeaderMenu
        name = {props.name}
        userEmail = {props.userEmail}
      />
    </header>
  )
}

 export default Header;
