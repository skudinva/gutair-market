import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ProductRdo } from './product.rdo';

export class ProductWithPaginationRdo {
  @Expose()
  @ApiProperty({
    description: 'List of entity',
    type: [ProductRdo],
  })
  @Type(() => ProductRdo)
  @ValidateNested({ always: true })
  public entities!: ProductRdo[];

  @Expose()
  @ApiProperty({
    description: 'totalPages',
    example: 10,
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'totalItems',
    example: 100,
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'currentPage',
    example: 1,
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'itemsPerPage',
    example: 5,
  })
  public itemsPerPage!: number;
}
