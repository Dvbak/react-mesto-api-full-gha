import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForms from '../utils/useForms';


export default function AddPlacePopup(props) {
  const {values, handleChange, setValues} = useForms({});

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(values);
  }

  useEffect(() => {
    setValues({})
  }, [props.isOpen, setValues])


  return(
    <PopupWithForm
      name = 'add'
      title = 'Новое место'
      titleBtn = 'Создать'
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      isDemand = {props.isDemand}
    >
      <fieldset className="popup__field">
        <label className="popup__field-label">
          <input
            type="text"
            id="place-input"
            name="name"
            // defaultValue=""
            value={values.name || ''}
            onChange={handleChange}
            required=""
            minLength={2}
            maxLength={30}
            className="popup__input popup__input_name_place"
          />
          <span className={`popup__input-hint place-input-hint ${values.name ? 'popup__input-hint_attached' : ''}`}>Название</span>
          <span className="place-input-error popup__input-error" />
        </label>
        <label className="popup__field-label">
          <input
            type="url"
            id="link-input"
            name="link"
            // defaultValue=""
            value={values.link || ''}
            onChange={handleChange}
            required=""
            className="popup__input popup__input_name_link"
          />
          <span className={`popup__input-hint link-input-hint ${values.link ? 'popup__input-hint_attached' : ''}`}>
            Ссылка на фотографию
          </span>
          <span className="link-input-error popup__input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
