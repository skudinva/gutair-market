import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoute, AuthorizationStatus } from '../../const';
import history from '../../history';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import AddProduct from '../add-product/add-product';
import EditProduct from '../edit-product/edit-product';
import Footer from '../footer/footer';
import Header from '../header/header';
import Login from '../login/login';
import PrivateRoute from '../private-route/private-route';
import ProductList from '../product-list/product-list';
import Product from '../product/product';
import Registration from '../registration/registration';

const App = (): JSX.Element => (
  <HistoryRouter history={history}>
    <Header />
    <Routes>
      <Route element={<Main />}>
        <Route
          index
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Products}
            >
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Products}
            >
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Products}
            >
              <Registration />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Products}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Products}/:id`}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Add}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Products}/:id${AppRoute.Edit}`}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <EditProduct />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    <Footer />
  </HistoryRouter>
);

export default App;
