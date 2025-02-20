import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadCrumbsProps = {
  isEditPage?: boolean;
  isProductDetail?: boolean;
  productName?: string;
};

const BreadCrumbs = (props: BreadCrumbsProps): JSX.Element => {
  const { pathname } = useLocation();
  const { isEditPage, productName, isProductDetail } = props;

  return (
    <ul className="breadcrumbs">
      {isProductDetail ? (
        <>
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
        </>
      ) : (
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.Login}>
            Вход
          </Link>
        </li>
      )}

      {(pathname === AppRoute.Products ||
        pathname === AppRoute.Add ||
        isEditPage) && (
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.Products}>
            Товары
          </Link>
        </li>
      )}

      {productName && (
        <li className="breadcrumbs__item">
          <Link className="link" to="">
            {productName}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default BreadCrumbs;
