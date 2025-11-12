import { useState } from 'react';
import { api, type Entry } from '../api/journalApi';
import JournalCard from '../components/JournalCard';
import JournalForm from '../components/JournalForm';
import styles from './Journal.module.scss';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Journal() {
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading } = useQuery<Entry[]>({
    queryKey: ['entries'],
    queryFn: api.listEntries,
  });

  const create = useMutation({
    mutationFn: (payload: Omit<Entry, 'id' | 'createdAt'>) =>
      api.createEntry(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries'] }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.deleteEntry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries'] }),
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Entry> }) =>
      api.updateEntry(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries'] }),
  });

  const [editing, setEditing] = useState<Entry | null>(null);

  return (
    <div className={styles.container}>
      <div className={`card ${styles.formWrapper}`}>
        <JournalForm
          onCreate={(data) => create.mutate(data)}
          onUpdate={(id, patch) => update.mutate({ id, patch })}
          editing={editing}
          onCancel={() => setEditing(null)}
        />
      </div>

      <div className={styles.entriesList}>
        {isLoading && <p className={styles.small}>Loading...</p>}
        {!isLoading && entries.length === 0 && (
          <p className={styles.small}>No entries yet - start writing ✍️</p>
        )}
        {entries.map((entry) => (
          <JournalCard
            key={entry.id}
            entry={entry}
            onEdit={() => setEditing(entry)}
            onDelete={() => remove.mutate(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}
