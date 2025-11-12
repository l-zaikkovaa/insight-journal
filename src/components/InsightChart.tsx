import React, { useMemo } from 'react';
import { type Entry } from '../api/journalApi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function moodToScore(m: Entry['mood']) {
  switch (m) {
    case 'happy':
      return 4;
    case 'excited':
      return 3;
    case 'neutral':
      return 2;
    case 'anxious':
      return 1;
    case 'sad':
      return 0;
    default:
      return 2;
  }
}

export default function InsightChart({ entries }: { entries: Entry[] }) {
  const data = useMemo(() => {
    const map = new Map();
    entries
      .slice()
      .reverse()
      .forEach((e) => {
        const d = e.createdAt.slice(0, 10);
        const score = moodToScore(e.mood);
        if (!map.has(d)) {
          map.set(d, { date: d, score, count: 1 });
        } else {
          const cur = map.get(d);
          cur.score = (cur.score * cur.count + score) / (cur.count + 1);
          cur.count += 1;
        }
      });

    return Array.from(map.values()).slice(-20);
  }, [entries]);

  if (data.length === 0)
    return (
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>No data yet</div>
    );

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0.4]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
