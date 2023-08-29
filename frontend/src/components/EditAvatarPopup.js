import React, { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const inputRef = useRef();
  const [link, setLink] = useState('');
//Прошу Вас обратить внимание, что данный стейт и связаный с ним handleChangeLink используются исключительно для эффекта всплытия подсказок (input-hint) в полях формы. Таким образом это совсем не предназначено для контроля инпута.
// Соглашусь с Вами, что происходит определенное дублирование кода, но это связано с заданием использовать в данном попапе контроль поля формы через useRef. К сожалению, я не смог добиться контроля подсказок через inputRef.current.value.

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  useEffect(() => {
    inputRef.current.value = '';
    setLink('');
  }, [props.isOpen])

  return (
    <PopupWithForm
      name = 'update'
      title = 'Обновить аватар'
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      isDemand = {props.isDemand}
    >
      <fieldset className="popup__field">
        <label className="popup__field-label">
          <input
            ref={inputRef}
            type="url"
            id="link-inputUpdate"
            name="link"
            defaultValue=""
            required=""
            onChange={handleChangeLink}
            className="popup__input popup__input_name_link"
          />
          <span className={`popup__input-hint link-inputUpdate-hint ${link ? 'popup__input-hint_attached' : ''}`}>
            Ссылка на фотографию
          </span>
          <span className="link-inputUpdate-error popup__input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}


