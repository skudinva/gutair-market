import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { UserAuth } from '../../types/types';
import EmailField from '../email-field/email-field';
import PasswordField from '../password-field/password-field';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);

    dispatch(loginUser(data));
  };

  return (
    <section className="login">
      <h1 className="login__title">Войти</h1>
      <p className="login__text">
        Hовый пользователь?{' '}
        <Link className="login__link" to={AppRoute.Register}>
          Зарегистрируйтесь
        </Link>{' '}
        прямо сейчас
      </p>
      <form method="post" action="/" onSubmit={handleFormSubmit}>
        <EmailField />
        <PasswordField />
        <button className="button login__button button--medium" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
