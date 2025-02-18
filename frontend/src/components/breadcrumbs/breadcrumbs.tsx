import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const BreadCrumbs = (): JSX.Element => (
  <ul className="breadcrumbs">
    <li className="breadcrumbs__item">
      <Link className="link" to={AppRoute.Login}>
        Вход
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to={AppRoute.Root}>
        Главная
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to={AppRoute.Products}>
        Каталог
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to="">
        Товар
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to="">
        Товары
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to="">
        СURT Z30 Plus
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to="">
        Новый товар
      </Link>
    </li>
  </ul>
);

export default BreadCrumbs;
