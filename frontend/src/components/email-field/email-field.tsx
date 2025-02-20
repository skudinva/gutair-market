import { useState } from 'react';

const EmailField = (): JSX.Element => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  return (
    <div
      className={['input-login', isEmailValid && 'input-login--no-error'].join(
        ' '
      )}
    >
      <label htmlFor="email">Введите e-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="off"
        required
        onInput={(e) => {
          e.preventDefault();
          setIsEmailValid(e.currentTarget.value.length > 0);
        }}
      />
      <p className="input-login__error">Заполните поле</p>
    </div>
  );
};

export default EmailField;
