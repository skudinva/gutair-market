import { useAppSelector } from '../../hooks';
import { getProduct } from '../../store/site-data/selectors';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import ProductForm from '../product-form/product-form';

const EditProduct = (): JSX.Element => {
  const product = useAppSelector(getProduct);
  return (
    <>
      <h1 className="edit-item__title">{product?.name}</h1>
      <BreadCrumbs isEditPage productName={product?.name} />
      <ProductForm />
    </>
  );
};

export default EditProduct;
