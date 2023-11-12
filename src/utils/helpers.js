import { useState, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";

export function formatMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    const hoursText = hours > 0 ?  `${hours}ч` : '';
    const minutesText = remainingMinutes > 0 ?  `${remainingMinutes}м` : '';
    
    return hoursText + ' ' + minutesText;
}

//Валидация
export function useFormValidation(startInvalid) {
  const [values, setValues] = useState(startInvalid);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      !isEmail(value)
        ? event.target.setCustomValidity("Некорректый адрес почты")
        : event.target.setCustomValidity("");
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  };

  const clearForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, clearForm };
};

export function transformMoviesArray(movies) {
  return movies.map((movie) => {
    const imageUrl = movie.image;
    const fileName = imageUrl.split('/uploads/')[1];
    
    return {
      ...movie,
      image: {
        url: `/uploads/${fileName}`
      }
    };
  });
}
