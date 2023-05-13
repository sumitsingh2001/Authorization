import React from 'react';
import {
  Body,
  Header,
  Logo,
  Navigation,
  Sidebar,
  Footer,
} from '../../components';

const Home = () => {
  return (
    <div className='home'>
      {/* <Logo /> */}
      <Navigation />
      <Header />
      <div className='main'>
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
