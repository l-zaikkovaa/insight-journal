import React, { useState, useEffect } from 'react';
import { type Entry, api } from '../api/journalApi';
import MoodSelector from './MoodSelector';
import styles from './JournalForm.module.scss';

type Props = {
  onCreate: (payload: Omit<Entry, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, patch: Partial<Entry>) => void;
  editing: Entry | null;
  onCancel: () => void;
};

export default function JournalForm({
  onCreate,
  onUpdate,
  editing,
  onCancel,
}: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Entry['mood']>('neutral');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editing) {
      setTags(editing.title);
      setContent(editing.content);
      setMood(editing.mood);
      setTags(editing.tags.join(', '));
    } else {
      setTitle('');
      setContent('');
      setMood('neutral');
      setTags('');
    }
  }, [editing]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Partial<Entry> = {
      title: title || 'Untitled',
      content,
      mood,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editing) {
      const patch: Partial<Entry> = payload;
      onUpdate(editing.id, patch);
      onCancel();
    } else {
      const newEntry: Omit<Entry, 'id' | 'createdAt'> = {
        title: title || 'Untitled',
        content,
        mood,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };
      onCreate(newEntry);
      setTitle('');
      setContent('');
      setTags('');
      setMood('neutral');
    }
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <MoodSelector value={mood} onChange={(m) => setMood(m)} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
      />
      <div style={{ display: 'flex', gap: 'o.5rem' }}>
        <button type="submit">{editing ? 'Save' : 'Add Entry'}</button>
        {editing && (
          <button type="button" onClick={onCancel} className="cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
