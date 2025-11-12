import styles from './MoodSelector.module.scss';

export const moods = [
  { key: 'happy', label: '😄' },
  { key: 'neutral', label: '😐' },
  { key: 'sad', label: '😢' },
  { key: 'anxious', label: '😰' },
  { key: 'excited', label: '🤩' },
] as const;

export type MoodKey = (typeof moods)[number]['key'];

export default function MoodSelector({
  value,
  onChange,
}: {
  value: MoodKey;
  onChange: (m: MoodKey) => void;
}) {
  return (
    <div className={styles.journal_moods}>
      {moods.map((m) => (
        <button
          key={m.key}
          type="button"
          onClick={() => onChange(m.key)}
          className={`${styles.journal_mood_btn} ${value === m.key ? styles.active : ''}`}
        >
          <span aria-hidden>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
