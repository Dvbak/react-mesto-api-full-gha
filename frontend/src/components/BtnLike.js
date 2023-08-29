import React, { useEffect, useState } from 'react';

export default function BtnLike(props) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(props.card.likes.some(item => item._id === props.userId))
  }, [props.card, props.userId]);


  return (
    <div className="elements__box">
      <button className={`elements__btn ${isLike ? 'elements__btn_like' : ''}`} type="button" onClick={() => props.onCardLike(props.card)} />
      <p className="elements__count">{props.card.likes.length}</p>
    </div>
  )
}
