import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import BtnLike from './BtnLike.js';

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="elements__img"
        onClick={() => props.onCardClick(props.card)}
      />
      {currentUser._id === props.card.owner._id && <button className="elements__btn-delet" type="button" onClick={() => props.onPopupDelet(props.card._id)} />}
      <div className="elements__inner">
        <h2 className="elements__title">{props.card.name}</h2>
        <BtnLike
          userId = {currentUser._id}
          onCardLike = {props.onCardLike}
          card = {props.card}
        />
      </div>
    </>
  )
}
