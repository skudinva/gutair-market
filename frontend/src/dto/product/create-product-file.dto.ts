import 'multer';
import { CreateProductDto } from './create-product.dto';

export class CreateProductFileDto {
  file!: File;
  product!: CreateProductDto;
}
