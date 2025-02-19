import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import ProductForm from '../product-form/product-form';

const AddProduct = (): JSX.Element => (
  <>
    <h1 className="add-item__title">Новый товар</h1>
    <BreadCrumbs />
    <ProductForm />
  </>
);

export default AddProduct;
