import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { deleteProduct } from '../../store/action';
import { Product } from '../../types/types';

type ProductItemProps = Product;

const ProductItem = (props: ProductItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const onDeleteButtonClick = () => {
    dispatch(deleteProduct(props.id));
  };

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={props.photoPath}
          width="36"
          height="93"
          alt="Картинка гитары"
        />
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
          onClick={onDeleteButtonClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
