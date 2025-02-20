import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutUser } from '../../store/action';
import { getIsAuthorized, getUser } from '../../store/user-process/selectors';
const pagesWithoutNavigation = [AppRoute.Login, AppRoute.Register];

const Header = () => {
  const { pathname } = useLocation() as { pathname: AppRoute };
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const user = useAppSelector(getUser);

  const handleLogoutClick = () => {
    if (isAuthorized) {
      dispatch(logoutUser());
    }
  };

  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Link className="header__logo logo" to={AppRoute.Root}>
              <img
                className="logo__img"
                width="70"
                height="70"
                src="./img/svg/logo.svg"
                alt="Логотип"
              />
            </Link>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={AppRoute.Products}>
                    Каталог
                  </Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to="#">
                    Где купить?
                  </Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to="#">
                    О компании
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">Имя</span>
              <Link
                className="header__link"
                to={AppRoute.Login}
                aria-label="Перейти в личный кабинет"
              >
                <svg
                  className="header__link-icon"
                  width="12"
                  height="14"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Вход</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
