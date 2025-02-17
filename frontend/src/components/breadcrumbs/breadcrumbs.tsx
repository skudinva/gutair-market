import { Link } from 'react-router-dom';

const BreadCrumbs = (): JSX.Element => (
  <ul className="breadcrumbs">
    <li className="breadcrumbs__item">
      <Link className="link" to="./main.html">
        Вход
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to="./main.html">
        Главная
      </Link>
    </li>
    <li className="breadcrumbs__item">
      <Link className="link" to="./main.html">
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
