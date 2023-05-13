import React from 'react';
import { Dashboard } from '../../pages';
import styles from './style.module.scss';

const Body = () => {
  return (
    <div className={`${styles.center} ${styles.body}`}>
      <Dashboard />
    </div>
  );
};

export default Body;
