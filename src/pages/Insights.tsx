import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type Entry } from '../api/journalApi';
import InsightChart from '../components/InsightChart';
import styles from './Insights.module.scss';
import { moods, type MoodKey } from './../components/MoodSelector';

export default function Insights() {
  const { data: entries = [], isLoading } = useQuery<Entry[]>({
    queryKey: ['entries'],
    queryFn: api.listEntries,
  });

  const moodCounts = entries.reduce<Record<MoodKey, number>>(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    {} as Record<MoodKey, number>,
  );

  const moodsInEntries = moods.filter((m) => moodCounts[m.key as MoodKey] > 0);

  const entriesFilter = (moodCat: MoodKey) => {
    return entries.filter((e) => e.mood === moodCat).length;
  };

  return (
    <div className={styles.container}>
      <div className="card">
        <h2 className={styles.heading}>Mood Trends</h2>
        <p className={styles.subheading}>
          Overview of emotions and writing frequency
        </p>
        <InsightChart entries={entries} />
      </div>

      <div className={styles.card}>
        <h3 className={styles.subheadingSmall}>Quick stats</h3>
        <div className={styles.grid}>
          <div>
            <div className={styles.statNumber}>{entries.length}</div>
            <div className={styles.statLabel}>Total entries</div>
          </div>
          {moodsInEntries.map((m) => (
            <div key={m.key}>
              <div className={styles.statNumber}>{moodCounts[m.key]}</div>
              <div className={styles.statLabel}>
                {m.key.charAt(0).toUpperCase() + m.key.slice(1)}
                {` ${m.label}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isLoading && <p className={styles.loading}>Loading...</p>}
    </div>
  );
}
