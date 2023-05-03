import React from 'react';
import Routes from '../Routes/Route';
import { BrowserRouter } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default Layout;
