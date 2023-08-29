import { useState } from "react";

export default function useForms(inputValues={}) {
  const [values, setValues] = useState(inputValues);

  function handleChange(evt) {
    const {value, name} = evt.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
