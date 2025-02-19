import { FormEvent } from 'react';
import { PRODUCT_TYPES, PRODUCT_TYPES_WEB } from '../../const';
import history from '../../history';
import { useAppDispatch } from '../../hooks';
import { postProduct } from '../../store/action';
import { CordsCountType, NewProduct, Product } from '../../types/types';

type ProductItemProps = {
  product?: Product;
};

const ProductForm = (props: ProductItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

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
          <input type="radio" id="guitar" name="item-type" value="guitar" />
          <label htmlFor="guitar">Акустическая гитара</label>
          <input
            type="radio"
            id="el-guitar"
            name="item-type"
            value="el-guitar"
          />
          <label htmlFor="el-guitar">Электрогитара</label>
          <input type="radio" id="ukulele" name="item-type" value="ukulele" />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
        <div className="input-radio add-item__form-radio">
          <span>Количество струн</span>
          <input type="radio" id="string-qty-4" name="string-qty" value="4" />
          <label htmlFor="string-qty-4">4</label>
          <input type="radio" id="string-qty-6" name="string-qty" value="6" />
          <label htmlFor="string-qty-6">6</label>
          <input type="radio" id="string-qty-7" name="string-qty" value="7" />
          <label htmlFor="string-qty-7">7</label>
          <input type="radio" id="string-qty-12" name="string-qty" value="12" />
          <label htmlFor="string-qty-12">12</label>
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
            <input type="text" name="title" placeholder="Наименование" />
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
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите артикул товара</span>
            <input type="text" name="sku" placeholder="Артикул товара" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea add-item__form-textarea">
          <label>
            <span>Введите описание товара</span>
            <textarea name="description" placeholder=""></textarea>
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
