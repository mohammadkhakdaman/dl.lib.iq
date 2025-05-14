import { useState } from 'react';

export function useSimpleForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    // Optional: you can track touched fields if you want later
  };

  const field = (name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur, // optional
  });

  const validate = (rules) => {
    const newErrors = {};

    for (const key in rules) {
      const rule = rules[key];
      if (rule) {
        const error = rule(values[key], key, values);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    field,
    validate,
    resetForm,
  };
}
