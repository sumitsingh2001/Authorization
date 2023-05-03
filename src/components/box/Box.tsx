import React from 'react';
import styles from './style.module.scss';

const Box = () => {
  return (
    <div className={`${styles.center} ${styles.box}`}>
      <p>Box</p>
    </div>
  );
};

export default Box;
