import React from "react";

export default function Forms(props) {
  return(
    <form action="#" className={`${props.name === 'signin' || props.name === 'signup' ? "login__form" : "popup__form"}`} name={`form-${props.name}`} noValidate="" onSubmit={props.onSubmit}>
      {props.children}
      {props.name === 'signin' || props.name === 'signup'
        ? <button type="submit" className="login__btn">{props.isDemand ? 'Ждите...' : props.titleBtn}</button>
        : <button type="submit" className="popup__submit">
        {props.isDemand ? 'Ждите...' : props.titleBtn || 'Сохранить'}
      </button>}
    </form>
  )
}
