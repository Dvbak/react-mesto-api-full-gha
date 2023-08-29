import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function resetForm() {
    setName(currentUser.name);
    setDescription(currentUser.about);
    console.log(currentUser);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser.name, currentUser.about, props.isOpen])

  function onCloseReset() {
    props.onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      name = 'edit'
      title = 'Редактировать профиль'
      isOpen = {props.isOpen}
      onClose = {onCloseReset}
      // onClose = {props.onClose}
      onSubmit = {handleSubmit}
      isDemand = {props.isDemand}
    >
      <fieldset className="popup__field">
        <label className="popup__field-label">
          <input
            type="text"
            id="name-input"
            name="name"
            required=""
            minLength={2}
            maxLength={40}
            value={name ? name : ''}
            onChange={handleChangeName}
            className="popup__input popup__input_name_name"
          />
          <span className={`popup__input-hint name-input-hint ${name ? 'popup__input-hint_attached' : ''}`}>Имя</span>
          <span className="name-input-error popup__input-error" />
        </label>
        <label className="popup__field-label">
          <input
            type="text"
            id="about-input"
            name="about"
            required
            minLength={2}
            maxLength={200}
            value={description ? description : ''}
            onChange={handleChangeDescription}
            className="popup__input popup__input_name_about"
          />
          <span className={`popup__input-hint about-input-hint ${description ? 'popup__input-hint_attached' : ''}`}>
            Вид деятельности
          </span>
          <span className="about-input-error popup__input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
