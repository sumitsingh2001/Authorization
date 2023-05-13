import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface privateAuth {
  children?: React.ReactNode;
}

const Private = (props: privateAuth) => {
  const navigate = useNavigate();

  useEffect(() => {
    // let login = localStorage.getItem('TOKEN');
    // !login && navigate('/login');

    // GETTING THE STORED VALUES TO NAVIGATE THE PAGES
    let store = localStorage.getItem('login');
    if (store) {
      store = JSON.parse(store);
      console.log('store', store);
    }
    !store && navigate('/login');
  });

  return <>{props.children}</>;
};

export default Private;
