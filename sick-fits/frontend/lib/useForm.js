import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');

  // update initial state when it changes
  useEffect(() => {
    setInputs(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  // The following two effects *should* result in an infinite loop, but seem not to
  // useEffect(() => {
  //   console.log({ initial });
  //   setInputs(initial);
  // }, [initial]);
  // useEffect(() => {
  //   console.log({ initial });
  //   setInputs(() => initial);
  // }, [initial]);

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
