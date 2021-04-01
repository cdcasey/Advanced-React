import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');
  console.log({ initialValues });
  // update initial state when it changes
  useEffect(() => {
    setInputs(initialValues);
  }, [initialValues]);
  console.log({ inputs });
  function handleChange(event) {
    let { name, type, value } = event.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = event.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // to use the function and data, they must be returned
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
