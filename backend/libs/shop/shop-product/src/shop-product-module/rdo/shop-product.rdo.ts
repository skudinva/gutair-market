import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ShopProductRdo {
  @Expose()
  @ApiProperty({
    description: 'productId',
    example: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'product type',
    example: 'Video',
  })
  productType!: string;

  @Expose()
  @ApiProperty({
    description: 'Author Id',
    example: '999aef3b7eadb76365f3c2cb',
  })
  userId!: string;

  @Expose()
  @ApiProperty({
    description: 'Reproduct flag',
    example: 'true',
  })
  isReproduct!: boolean;

  @Expose()
  @ApiProperty({
    description: 'Source author Id',
    example: '999aef3b7eadb76365f3c2cb',
  })
  originUserId?: string;

  @Expose()
  @ApiProperty({
    description: 'Source product Id',
    example: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b',
  })
  originProductId?: string;

  @Expose()
  @ApiProperty({
    description: 'Product state',
    example: 'Published',
  })
  state!: string;

  @Expose()
  @ApiProperty({
    description: 'Date of product create',
    example: '2024-11-24T10:42:10+07:00',
  })
  createdAt!: string;

  @Expose()
  @ApiProperty({
    description: 'Date of product publication',
    example: '2024-11-24T10:42:10+07:00',
  })
  publicDate!: string;
}
