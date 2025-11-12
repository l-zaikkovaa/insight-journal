import { type Entry } from '../api/journalApi';
import styles from './JournalCard.module.scss';
import { moods } from './../components/MoodSelector';

type Props = {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
};

type Mood = (typeof moods)[number];

export default function JournalCard({ entry, onEdit, onDelete }: Props) {
  const moodInfo: Mood | undefined = moods.find((m) => m.key === entry.mood);

  return (
    <div className={styles.card}>
      <div className={styles.entryInfo}>
        <div className={styles.header}>
          <div>
            <div className={styles.date}>
              {new Date(entry.createdAt).toLocaleString()}
            </div>
            <div className={styles.title}>{entry.title}</div>
          </div>
        </div>
        <div className={styles.content}>{entry.content}</div>
        <div className={styles.tags}>
          {entry.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.entry_actions}>
        {moodInfo ? (
          <div className={`small ${styles.mood_label}`}>
            <span className={styles.mood_text}>{moodInfo.key}</span>
            <span className={styles.mood_emoji}>{moodInfo.label}</span>
          </div>
        ) : (
          <div className={styles.mood_label}>
            <span className={styles.mood_text}>{entry.mood}</span>
          </div>
        )}
        <div className={styles.buttons}>
          <button onClick={onEdit} className={styles.button}>
            Edit
          </button>
          <button
            onClick={onDelete}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
