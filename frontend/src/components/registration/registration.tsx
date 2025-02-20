import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/action';
import { UserRegister } from '../../types/types';
import EmailField from '../email-field/email-field';
import PasswordField from '../password-field/password-field';

const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isNameValid, setIsNameValid] = useState<boolean>(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: UserRegister = {
      email: formData.get('email')?.toString() || '',
      name: formData.get('name')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };

    dispatch(registerUser(data));
  };

  return (
    <section className="login">
      <h1 className="login__title">Регистрация</h1>
      <form method="post" action="#" onSubmit={handleFormSubmit}>
        <div
          className={[
            'input-login',
            isNameValid && 'input-login--no-error',
          ].join(' ')}
        >
          <label htmlFor="name">Введите имя</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            required
            onInput={(e) => {
              e.preventDefault();
              setIsNameValid(e.currentTarget.value.length > 0);
            }}
          />
          <p className="input-login__error">Заполните поле</p>
        </div>
        <EmailField />
        <PasswordField />
        <button className="button login__button button--medium" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
};

export default Registration;
