import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import history from '../../history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts } from '../../store/action';
import {
  getIsProductsLoading,
  getProducts,
} from '../../store/site-data/selectors';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import ProductFilter from '../product-filter/product-filter';
import ProductItem from '../product-item/product-item';
import ProductSort from '../product-sort/product-sort';
import Spinner from '../spinner/spinner';

const ProductList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    dispatch(fetchProducts(searchParams.toString()));
  }, [dispatch, searchParams]);

  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const products = useAppSelector(getProducts);
  const page = parseInt(searchParams.get('page') ?? '0', 10);

  const handlerGotoPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  };

  if (isProductsLoading) {
    return <Spinner />;
  }

  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>
        <BreadCrumbs />
        <div className="catalog">
          <ProductFilter />
          <ProductSort />
          <div className="catalog-cards">
            <ul className="catalog-cards__list">
              {products.entities.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </ul>
          </div>
        </div>
        <button
          className="button product-list__button button--red button--big"
          onClick={() => history.push(AppRoute.Add)}
        >
          Добавить новый товар
        </button>
        <div className="pagination product-list__pagination">
          <ul className="pagination__list">
            {page > 1 ? (
              <li className="pagination__page pagination__page--prev" id="prev">
                <a
                  className="link pagination__page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handlerGotoPage(page - 1);
                  }}
                >
                  Назад
                </a>
              </li>
            ) : null}

            {Array.from({ length: products.totalPages }).map((_page, index) => {
              const iPage = index + 1;
              const activeClass =
                page === iPage ? 'pagination__page--active' : '';
              return (
                <li
                  className={`pagination__page ${activeClass}`}
                  key={`page${iPage}`}
                >
                  <a
                    className="link pagination__page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handlerGotoPage(iPage);
                    }}
                  >
                    {iPage}
                  </a>
                </li>
              );
            })}
            {page < products.totalPages ? (
              <li className="pagination__page pagination__page--next" id="next">
                <a
                  className="link pagination__page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handlerGotoPage(page + 1);
                  }}
                >
                  Далее
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
