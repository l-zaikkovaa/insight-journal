import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to Insight Journal</h1>
        <p className={styles.subtitle}>
          Your personal space to reflect, track emotions, and understand
          yourself deeper.
        </p>
        <p className={styles.subtitle_small}>
          Start writing your journal or explore insights built from your own
          thoughts.
        </p>
        <div className={styles.chips}>
          <span className={styles.chip}>No cloud — all local</span>
          <span className={styles.chip}>Privacy-first</span>
          <span className={styles.chip}>Powered by your emotions</span>
        </div>
        <div className={styles.links}>
          <Link to="/journal" className={styles.primary_btn}>
            ✍️ Write a Journal
          </Link>
          <Link to="/insights" className={styles.secondary_btn}>
            📊 View Insights
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
