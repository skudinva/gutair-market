import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCT_TYPES_NAMES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProduct } from '../../store/action';
import {
  getIsProductLoading,
  getProduct,
} from '../../store/site-data/selectors';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import Spinner from '../spinner/spinner';

const Product = (): JSX.Element | null => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isProductLoading = useAppSelector(getIsProductLoading);
  const product = useAppSelector(getProduct);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [params, dispatch]);

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <h1 className="page-content__title title title--bigger">Товар</h1>
      <BreadCrumbs />
      <div className="product-container">
        <img
          className="product-container__img"
          src={product.photoPath}
          width="90"
          height="235"
          alt=""
        />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">
            {product.name}
          </h2>
          <br />
          <br />
          <div className="tabs">
            <Link
              className="button button--medium tabs__button"
              to="#characteristics"
            >
              Характеристики
            </Link>
            <Link
              className="button button--black-border button--medium tabs__button"
              to="#description"
            >
              Описание
            </Link>
            <div className="tabs__content" id="characteristics">
              <table className="tabs__table">
                <tbody>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{product.article}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">
                      {PRODUCT_TYPES_NAMES[product.productType]}
                    </td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">
                      {product.cordsCount} струнная
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="tabs__product-description">{product.describe}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
