import React from 'react';
import { Dashboard, Home, Home2 } from '../pages';
import { APP_ROUTES } from '../Routes/RoutePath';
import { Routes as DomRoutes, Route } from 'react-router-dom';
import { Login, Private } from '../components';
import { AuthContext } from '../context/AuthContext';
import { BookContext } from '../context/BookContext';

const Routes = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [bookId, setBookId] = React.useState<number | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <DomRoutes>
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route
          path={APP_ROUTES.ROOT}
          element={
            <Private>
              <Home2 />
            </Private>
          }
        />
        <Route
          path={APP_ROUTES.DASHBOARD}
          element={
            <Private>
              <BookContext.Provider value={{ bookId, setBookId }}>
                <Home />
              </BookContext.Provider>
            </Private>
          }
        />
      </DomRoutes>
    </AuthContext.Provider>
  );
};

export default Routes;
