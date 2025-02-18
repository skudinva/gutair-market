import { Product } from '../../types/types';

type ProductItemProps = Product & {
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isMini?: boolean;
  classPrefix?: string;
};

const ProductItem = (props: ProductItemProps): JSX.Element => (
  <li className="catalog-item">
    <div className="catalog-item__data">
      <img
        src="img/content/catalog-product-1.png"
        srcSet="img/content/catalog-product-1@2x.png 2x"
        width="36"
        height="93"
        alt="Картинка гитары"
      />
      <div className="catalog-item__data-wrapper">
        <a className="link" href="./product.html">
          <p className="catalog-item__data-title">ЭлектроГитара Честер bass</p>
        </a>
        <br />
        <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
        <p className="catalog-item__data-price">17 500 ₽</p>
      </div>
    </div>
    <div className="catalog-item__buttons">
      <a
        className="button button--small button--black-border"
        href="edit-item.html"
        aria-label="Редактировать товар"
      >
        Редактировать
      </a>
      <button
        className="button button--small button--black-border"
        type="submit"
        aria-label="Удалить товар"
      >
        Удалить
      </button>
    </div>
  </li>
);

export default ProductItem;
