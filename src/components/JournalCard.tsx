import { type Entry } from '../api/journalApi';
import styles from './JournalCard.module.scss';

type Props = {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
};

export default function JournalCard({ entry, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
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
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className={styles.delete}>
          Delete
        </button>
      </div>
    </div>
  );
}
