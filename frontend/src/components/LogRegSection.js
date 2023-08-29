import React from "react";
import { Link } from 'react-router-dom';
import Forms from "./Forms";

export default function LogRegSection(props) {
  return (
    <section className="login page__center">
      <h2 className="login__title">{props.title}</h2>
      <Forms
        name = {props.name}
        titleBtn = {props.titleBtn}
        onSubmit = {props.onSubmit}
        children = {props.children}
        isDemand = {props.isDemand}
      />
      {props.name === 'signup' && <p className="login__text">
        <Link to={'/sign-in'} className="login__link">
          Уже зарегистрованы? Войти
        </Link>
      </p>}
    </section>
  )
}
