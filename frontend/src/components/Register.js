import React, { useEffect } from 'react';
import LogRegSection from './LogRegSection';
import useForms from '../utils/useForms';

export default function Register(props) {
  const {values, handleChange, setValues} = useForms({});

  function onRegister(evt) {
    evt.preventDefault();
    props.handleRegister(values.email, values.password)
  }

  useEffect(() => {
    setValues({})
  }, [props.isInfoTooltip, setValues])

  return (
    <LogRegSection
      name = {props.name}
      title = {props.title}
      titleBtn = {props.titleBtn}
      isDemand = {props.isDemand}
      onSubmit = {onRegister}
    >
      <fieldset className="login__field">
        <input
          type="email"
          className="login__input"
          id="email-input"
          value={values.email || ''}
          onChange={handleChange}
          placeholder={'Email'}
          name="email"
          required
        />
        <input
          type="password"
          className="login__input"
          id="password-input"
          value={values.password || ''}
          onChange={handleChange}
          placeholder={'Пароль'}
          name="password"
          minLength={8}
          maxLength={16}
          required
        />
      </fieldset>
    </LogRegSection>
  )
}

