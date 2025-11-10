import React from 'react';
import styles from './Insights.module.scss';

function Insights() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Insights Page</h2>
      <p className={styles.text}>
        This is where insights and charts will be displayed.
      </p>
    </div>
  );
}

export default Insights;
