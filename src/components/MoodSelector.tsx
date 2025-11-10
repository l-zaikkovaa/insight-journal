import React from 'react';

const moods = [
  { key: 'happy', label: '😄' },
  { key: 'neutral', label: '😐' },
  { key: 'sad', label: '😢' },
  { key: 'anxious', label: '😰' },
  { key: 'excited', label: '🤩' },
] as const;

type MoodKey = (typeof moods)[number]['key'];

export default function MoodSelector({
  value,
  onChange,
}: {
  value: MoodKey;
  onChange: (m: MoodKey) => void;
}) {
  return (
    <div className="flex gap-2">
      {moods.map((m) => (
        <button
          key={m.key}
          type="button"
          onClick={() => onChange(m.key)}
          className={`px-2 py-1 border rounded ${value === m.key ? 'bg-blue-50' : ''}`}
        >
          <span aria-hidden>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
