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
            <li className="pagination__page pagination__page--active">
              <a className="link pagination__page-link" href="1">
                1
              </a>
            </li>
            <li className="pagination__page">
              <a className="link pagination__page-link" href="2">
                2
              </a>
            </li>
            <li className="pagination__page">
              <a className="link pagination__page-link" href="3">
                3
              </a>
            </li>
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href="2">
                Далее
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
