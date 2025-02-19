import { Product } from '../../types/types';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import ProductForm from '../product-form/product-form';

const EditProduct = (): JSX.Element => (
  <>
    <h1 className="edit-item__title">СURT Z30 Plus</h1>
    <BreadCrumbs />
    <ProductForm onFormSubmit={(product: Product) => console.log(product)} />
  </>
);

export default EditProduct;
