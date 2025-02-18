import { ProductWithPagination } from '../../types/types';
import { ProductRdo } from './product.rdo';

export class ProductWithPaginationRdo implements ProductWithPagination {
  public entities!: ProductRdo[];
  public totalPages!: number;
  public totalItems!: number;
  public currentPage!: number;
  public itemsPerPage!: number;
}
