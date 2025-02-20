import { useSearchParams } from 'react-router-dom';
import { CORDS_COUNT, PRODUCT_TYPES_NAMES } from '../../const';

const ProductFilter = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleProductTypeChange = (type: string, isChecked: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      newSearchParams.append('productType', type);
    } else {
      const newTypes = newSearchParams
        .getAll('productType')
        .filter((filterType) => filterType !== type);
      newSearchParams.delete('productType');
      newTypes.forEach((newType) => {
        newSearchParams.append('productType', newType);
      });
    }
    setSearchParams(newSearchParams);
  };

  const handleCordsChange = (cord: string, isChecked: boolean) => {
    if (isChecked) {
      searchParams.append('cordsCount', cord);
    } else {
      const newCords = searchParams
        .getAll('cordsCount')
        .filter((filterCord) => filterCord !== cord);
      searchParams.delete('cordsCount');
      newCords.forEach((newCord) => {
        searchParams.append('cordsCount', newCord);
      });
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      newSearchParams.append('cordsCount', cord);
    } else {
      const newCords = newSearchParams
        .getAll('cordsCount')
        .filter((filterType) => filterType !== cord);
      newSearchParams.delete('cordsCount');
      newCords.forEach((newCord) => {
        newSearchParams.append('cordsCount', newCord);
      });
    }

    setSearchParams(newSearchParams);
  };

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Object.entries(PRODUCT_TYPES_NAMES).map(
          ([productType, productName]) => {
            //console.log(selectedTypes);

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
                  checked={searchParams
                    .getAll('productType')
                    .includes(productType)}
                  onChange={(e) => {
                    handleProductTypeChange(productType, e.target.checked);
                  }}
                />
                <label htmlFor={productType}>{productName}</label>
              </div>
            );
          }
        )}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
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
                checked={searchParams
                  .getAll('cordsCount')
                  .includes(cord.toString())}
                onChange={(e) =>
                  handleCordsChange(cord.toString(), e.target.checked)
                }
              />
              <label htmlFor={`${cord}-strings`}>{cord}</label>
            </div>
          );
        })}
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={() => {
          setSearchParams([]);
        }}
      >
        Очистить
      </button>
    </form>
  );
};

export default ProductFilter;
