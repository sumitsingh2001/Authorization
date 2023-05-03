import React from 'react';
import { Home, Home2 } from '../pages';
import { APP_ROUTES } from '../Routes/RoutePath';
import { Routes as DomRoutes, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <>
      <DomRoutes>
        <Route path={APP_ROUTES.ROOT} element={<Home />} />
        <Route path={APP_ROUTES.LAYOUT2} element={<Home2 />} />
      </DomRoutes>
    </>
  );
};

export default Routes;
