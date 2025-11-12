import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Insight Journal</h1>
      <p className={styles.subtitle}>Reflect • Track • Learn</p>
      <p className={styles.subtitle}>
        Your personal space to track journal entries and explore insights.
      </p>
      <div className={styles.links}>
        <Link to="/journal" className={styles.linkButton}>
          Go to Journal
        </Link>
        <Link to="/insights" className={styles.linkButton}>
          Go to Insights
        </Link>
      </div>
    </div>
  );
};

export default Home;
