import React, { useContext } from 'react';
import avatarEdit from '../images/icon/edit.svg';
import edit from '../images/icon/edit.svg';
import add from '../images/icon/add.svg';

import Card from '../components/Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main page__center">
      <section className="profile">
        <div className="profile__box-img">
          <img src={currentUser.avatar ? currentUser.avatar : '#'}
            onClick={props.onEditAvatar}
            alt="Аватар" className="profile__avatar" tabIndex={0}
          />
          <img
            src={avatarEdit}
            alt="Редактировать"
            className="profile__avatar-edit"
          />
        </div>
        <div className="profile__inner">
          <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
          <p className="profile__subtitle">{currentUser.about ? currentUser.about : ''}</p>
          <button className="profile__btn-edit" onClick={props.onEditProfile} type="button">
            <img
              src={edit}
              alt="карандаш"
              className="profile__pic-edit"
            />
          </button>
        </div>
        <button className="profile__btn-add" type="button"
        onClick={props.onAddPlace}>
          <img
            src={add}
            alt="добавить"
            className="profile__pic-add"
          />
        </button>
      </section>
      <section className="elements" aria-label="Фотогалерея">
        <ul className="elements__grid">
          {props.cards.map((item) => {
            return (
              <li className="elements__item" key={item._id}>
                <Card
                  card = {item}
                  onCardClick = {props.onCardClick}
                  onPopupDelet = {props.onPopupDelet}
                  onCardLike = {props.onCardLike}
                />
              </li>)
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
