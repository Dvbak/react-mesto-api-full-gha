import React, { useEffect } from 'react';
import LogRegSection from './LogRegSection';
import useForms from '../utils/useForms';

export default function Login(props) {
  const {values, handleChange, setValues} = useForms({});

  function onLogin(evt) {
    evt.preventDefault();
    console.log(values);
    props.handleLogin(values.email, values.password)
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
      onSubmit = {onLogin}
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
