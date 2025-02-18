import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
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
  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const products = useAppSelector(getProducts);
  const currentPage = 1;

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
        <button className="button product-list__button button--red button--big">
          Добавить новый товар
        </button>
        <div className="pagination product-list__pagination">
          <ul className="pagination__list">
            {Array.from({ length: products.totalPages }).map((_page, index) => {
              const iPage = index + 1;
              const activeClass =
                currentPage === iPage ? 'pagination__page--active' : '';
              return (
                <li
                  className={`pagination__page ${activeClass}`}
                  key={`page${iPage}`}
                >
                  <Link
                    className="link pagination__page-link"
                    to={iPage.toString()}
                  >
                    {iPage}
                  </Link>
                </li>
              );
            })}
            {currentPage < products.totalPages ? (
              <li className="pagination__page pagination__page--next" id="next">
                <Link
                  className="link pagination__page-link"
                  to={(currentPage + 1).toString()}
                >
                  Далее
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
