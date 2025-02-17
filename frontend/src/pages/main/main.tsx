import { Outlet } from 'react-router-dom';

const Main = (): JSX.Element => (
  <main className="page-content">
    <div className="container">
      <Outlet />
    </div>
  </main>
);

export default Main;
