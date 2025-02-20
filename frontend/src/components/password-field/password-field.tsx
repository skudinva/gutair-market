import { useState } from 'react';

const PasswordField = (): JSX.Element => {
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  return (
    <div
      className={[
        'input-login',
        isPasswordValid && 'input-login--no-error',
      ].join(' ')}
    >
      <label htmlFor="passwordLogin">Введите пароль</label>
      <span>
        <input
          type="password"
          placeholder="• • • • • • • • • • • •"
          id="passwordLogin"
          name="password"
          autoComplete="off"
          required
          onInput={(e) => {
            e.preventDefault();
            setIsPasswordValid(e.currentTarget.value.length > 0);
          }}
        />
        <button className="input-login__button-eye" type="button">
          <svg width="14" height="8" aria-hidden="true">
            <use xlinkHref="#icon-eye"></use>
          </svg>
        </button>
      </span>
      <p className="input-login__error">Заполните поле</p>
    </div>
  );
};

export default PasswordField;
