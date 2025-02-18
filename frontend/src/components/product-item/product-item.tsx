import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Product } from '../../types/types';

type ProductItemProps = Product & {
  onDeleteClick?: (id: string) => void;
  classPrefix?: string;
};

const ProductItem = (props: ProductItemProps): JSX.Element => (
  <li className="catalog-item">
    <div className="catalog-item__data">
      <img src={props.photoPath} width="36" height="93" alt="Картинка гитары" />
      <div className="catalog-item__data-wrapper">
        <Link className="link" to={`${AppRoute.Products}/${props.id}`}>
          <p className="catalog-item__data-title">{props.name}</p>
        </Link>
        <br />
        <p className="catalog-item__data-date">
          Дата добавления {dayjs(props.createdAt).format('DD.MM.YYYY')}
        </p>
        <p className="catalog-item__data-price">{props.price} ₽</p>
      </div>
    </div>
    <div className="catalog-item__buttons">
      <Link
        className="button button--small button--black-border"
        to={`${AppRoute.Products}/${props.id}${AppRoute.Edit}`}
        aria-label="Редактировать товар"
      >
        Редактировать
      </Link>
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
