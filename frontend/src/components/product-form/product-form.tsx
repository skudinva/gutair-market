import dayjs from 'dayjs';
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  AppRoute,
  CORDS_COUNT,
  PRODUCT_TYPES_NAMES,
  ProductType,
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

const ProductForm = (): JSX.Element | null => {
  const params = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isProductLoading = useAppSelector(getIsProductLoading);
  const product =
    pathname === AppRoute.Add ? ({} as Product) : useAppSelector(getProduct);
  const isNewForm = pathname === AppRoute.Add;

  const [oldPhotoPath, setOldPhotoPath] = useState<string>();
  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [params, dispatch]);

  useEffect(() => {
    if (product?.photoPath) {
      if (imgRef.current) {
        imgRef.current.srcset = product.photoPath;
      }

      const url = new URL(product?.photoPath);
      setOldPhotoPath(url.pathname.replace('/static/', ''));
    }
  }, [product, dispatch]);

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const uploadRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedPhoto(files[0]);
      if (imgRef.current) {
        imgRef.current.srcset = URL.createObjectURL(files[0]);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log('selectedPhoto', selectedPhoto);

    if (selectedPhoto) {
      formData.append('file', selectedPhoto);
    }

    const newProduct: NewProduct['product'] = {
      name: formData.get('title')?.toString() || '',
      describe: formData.get('description')?.toString() || '',
      createdAt: new Date(),
      photoPath: oldPhotoPath || '',
      productType: formData.get('item-type')?.toString() as ProductType,
      article: formData.get('sku')?.toString() || '',
      cordsCount: parseInt(
        formData.get('string-qty')?.toString() || '0'
      ) as CordsCountType,
      price: parseInt(formData.get('price')?.toString() || '0', 10),
    };

    formData.append('product', JSON.stringify(newProduct));

    dispatch(postProduct(formData));
  };

  const onImageAddButtonClick = () => {
    uploadRef.current?.click();
  };

  const onImageDeleteButtonClick = () => {
    console.log(222);
  };

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!product) {
    return null;
  }

  return (
    <form
      className="add-item__form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div className="add-item__form-left">
        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap">
            <input
              type="file"
              accept="image/*"
              ref={uploadRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <img srcSet={product.photoPath} ref={imgRef} alt="Photo" />
          </div>
          <div className="edit-item-image__btn-wrap">
            <button
              className="button button--small button--black-border edit-item-image__btn"
              type="button"
              onClick={onImageAddButtonClick}
            >
              {isNewForm ? 'Добавить' : 'Заменить'}
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
          {Object.entries(PRODUCT_TYPES_NAMES).map(
            ([productType, productName]) => {
              return (
                <Fragment key={`item-type-${productType}`}>
                  <input
                    type="radio"
                    id={productType}
                    name="item-type"
                    value={productType}
                    defaultChecked={productType === product.productType}
                  />
                  <label htmlFor={productType}>{productName}</label>
                </Fragment>
              );
            }
          )}
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
              placeholder="Дата в формате 00.00.0000"
              defaultValue={dayjs(product.createdAt).format('DD.MM.YYYY')}
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
