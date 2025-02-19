import { CORDS_COUNT, PRODUCT_TYPES_NAMES } from '../../const';

const ProductFilter = (): JSX.Element => (
  <form className="catalog-filter" action="#" method="post">
    <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {Object.entries(PRODUCT_TYPES_NAMES).map(([productType, productName]) => {
        return (
          <div
            className="form-checkbox catalog-filter__block-item"
            key={`item-type-${productType}`}
          >
            <input
              className="visually-hidden"
              type="checkbox"
              id={productType}
              name={productType}
            />
            <label htmlFor={productType}>{productName}</label>
          </div>
        );
      })}
    </fieldset>
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {CORDS_COUNT.map((cord) => {
        return (
          <div
            className="form-checkbox catalog-filter__block-item"
            key={`string-qty-${cord}`}
          >
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${cord}-strings`}
              name={`${cord}-strings`}
            />
            <label htmlFor={`${cord}-strings`}>{cord}</label>
          </div>
        );
      })}
    </fieldset>
    <button
      className="catalog-filter__reset-btn button button--black-border button--medium"
      type="reset"
    >
      Очистить
    </button>
  </form>
);

export default ProductFilter;
