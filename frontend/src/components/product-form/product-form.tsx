import { FormEvent, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CORDS_COUNT,
  PRODUCT_TYPES,
  PRODUCT_TYPES_NAMES,
  PRODUCT_TYPES_WEB,
} from '../../const';
import history from '../../history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProduct, postProduct } from '../../store/action';
import {
  getIsProductLoading,
  getProduct,
} from '../../store/site-data/selectors';
import { CordsCountType, NewProduct, Product } from '../../types/types';
import Spinner from '../spinner/spinner';

type ProductItemProps = {
  product?: Product;
};

const ProductForm = (props: ProductItemProps): JSX.Element | null => {
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const productType =
      PRODUCT_TYPES[
        PRODUCT_TYPES_WEB.findIndex(
          (type) => type === formData.get('item-type')?.toString()
        )
      ];

    const data: NewProduct = {
      product: {
        name: formData.get('title')?.toString() || '',
        describe: formData.get('title')?.toString() || '',
        createdAt: new Date(),
        photoPath: '',
        productType: productType,
        article: formData.get('sku')?.toString() || '',
        cordsCount: parseInt(
          formData.get('string-qty')?.toString() || '0'
        ) as CordsCountType,
        price: parseInt(formData.get('price')?.toString() || '0', 10),
      },
      file: undefined,
    };

    dispatch(postProduct(data));
  };

  const onImageAddButtonClick = () => {
    console.log(111);
  };

  const onImageDeleteButtonClick = () => {
    console.log(222);
  };

  return (
    <form
      className="add-item__form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div className="add-item__form-left">
        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap"></div>
          <div className="edit-item-image__btn-wrap">
            <button
              className="button button--small button--black-border edit-item-image__btn"
              type="button"
              onClick={onImageAddButtonClick}
            >
              Добавить
            </button>
            <button
              className="button button--small button--black-border edit-item-image__btn"
              type="button"
              onClick={onImageDeleteButtonClick}
            >
              Удалить
            </button>
          </div>
        </div>
        <div className="input-radio add-item__form-radio">
          <span>Выберите тип товара</span>
          {PRODUCT_TYPES_WEB.map((type) => {
            return (
              <Fragment key={`item-type-${type}`}>
                <input
                  type="radio"
                  id={type}
                  name="item-type"
                  value={type}
                  defaultChecked={
                    PRODUCT_TYPES_NAMES[type] ===
                    PRODUCT_TYPES_NAMES[product.productType]
                  }
                />
                <label htmlFor={type}>{PRODUCT_TYPES_NAMES[type]}</label>
              </Fragment>
            );
          })}
        </div>
        <div className="input-radio add-item__form-radio">
          <span>Количество струн</span>
          {CORDS_COUNT.map((cord) => {
            return (
              <Fragment key={`string-qty-${cord}`}>
                <input
                  type="radio"
                  id={`string-qty-${cord}`}
                  name="string-qty"
                  value={cord}
                  defaultChecked={product.cordsCount === cord}
                />
                <label htmlFor={`string-qty-${cord}`}>{cord}</label>
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="add-item__form-right">
        <div className="custom-input add-item__form-input">
          <label>
            <span>Дата добавления товара</span>
            <input
              type="text"
              name="date"
              value=""
              placeholder="Дата в формате 00.00.0000"
              readOnly
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите наименование товара</span>
            <input
              type="text"
              name="title"
              placeholder="Наименование"
              defaultValue={product.name}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
          <label>
            <span>Введите цену товара</span>
            <input
              type="text"
              name="price"
              placeholder="Цена в формате 00 000"
              defaultValue={product.price}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите артикул товара</span>
            <input
              type="text"
              name="sku"
              placeholder="Артикул товара"
              defaultValue={product.article}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea add-item__form-textarea">
          <label>
            <span>Введите описание товара</span>
            <textarea
              name="description"
              placeholder=""
              defaultValue={product.describe}
            ></textarea>
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className="add-item__form-buttons-wrap">
        <button
          className="button button--small add-item__form-button"
          type="submit"
        >
          Сохранить изменения
        </button>
        <button
          className="button button--small add-item__form-button"
          type="button"
          onClick={() => history.back()}
        >
          Вернуться к списку товаров
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
