import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  SortBy,
  SortDirection,
} from '../../const';

const ProductSort = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || DEFAULT_SORT_BY;
  const sortDirection =
    searchParams.get('sortDirection') || DEFAULT_SORT_DIRECTION;

  const handlerSetSortBy = (sortBy: SortBy) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sortBy', sortBy);
    setSearchParams(newSearchParams);
  };

  const handlerSetSortDirection = (sortDirection: SortDirection) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sortDirection', sortDirection);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={[
            'catalog-sort__type-button',
            sortBy === SortBy.Date ? 'catalog-sort__type-button--active' : '',
          ].join(' ')}
          aria-label="по дате"
          onClick={(e) => {
            e.preventDefault();
            handlerSetSortBy(SortBy.Date);
          }}
        >
          по дате
        </button>
        <button
          className={[
            'catalog-sort__type-button',
            sortBy === SortBy.Price ? 'catalog-sort__type-button--active' : '',
          ].join(' ')}
          aria-label="по цене"
          onClick={(e) => {
            e.preventDefault();
            handlerSetSortBy(SortBy.Price);
          }}
        >
          по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={[
            'catalog-sort__order-button',
            'catalog-sort__order-button--up',
            sortDirection === SortDirection.Asc
              ? 'catalog-sort__order-button--active'
              : '',
          ].join(' ')}
          aria-label="По возрастанию"
          onClick={(e) => {
            e.preventDefault();
            handlerSetSortDirection(SortDirection.Asc);
          }}
        ></button>
        <button
          className={[
            'catalog-sort__order-button',
            'catalog-sort__order-button--down',
            sortDirection === SortDirection.Desc
              ? 'catalog-sort__order-button--active'
              : '',
          ].join(' ')}
          aria-label="По убыванию"
          onClick={(e) => {
            e.preventDefault();
            handlerSetSortDirection(SortDirection.Desc);
          }}
        ></button>
      </div>
    </div>
  );
};

export default ProductSort;
