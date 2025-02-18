import 'multer';
import { UpdateProductDto } from './update-product.dto';

export class UpdateProductFileDto {
  file!: File;
  product!: UpdateProductDto;
}
