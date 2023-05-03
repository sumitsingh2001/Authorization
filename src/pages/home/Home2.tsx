import React from 'react';
import { Box, Footer, Header, Info, Logo, Navigation } from '../../components';

const Home2 = () => {
  return (
    <>
      <div className='home'>
        <div className='header-part'>
          <Logo />
          <Navigation />
        </div>
        <Header />
        <Info />
        <div className='box_cont'>
          <Box />
          <Box />
          <Box />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home2;
