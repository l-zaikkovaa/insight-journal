import React from 'react';
import styles from './Journal.module.scss';

function Journal() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Journal Page</h2>
      <p className={styles.text}>This is where journal entries will appear.</p>
    </div>
  );
}

export default Journal;
