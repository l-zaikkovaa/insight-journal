import { v4 as uuid4 } from 'uuid';

export type Entry = {
  id: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'excited';
  tags: string[];
  createdAt: string;
};

const STORAGE_KEY = 'insight_journal_entries_v1';

function readStorage(): Entry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Entry[];
  } catch {
    return [];
  }
}

function writeStorage(items: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

export const api = {
  async listEntries(): Promise<Entry[]> {
    const items = readStorage();
    return delay(
      200,
      items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    );
  },

  async createEntry(payload: Omit<Entry, 'id' | 'createdAt'>): Promise<Entry> {
    const items = readStorage();
    const entry: Entry = {
      ...payload,
      id: uuid4(),
      createdAt: new Date().toISOString(),
    };
    items.push(entry);
    writeStorage(items);
    return delay(200, entry);
  },

  async updateEntry(id: string, patch: Partial<Entry>): Promise<Entry | null> {
    const items = readStorage();
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) return delay(200, null);
    items[idx] = { ...items[idx], ...patch };
    writeStorage(items);
    return delay(200, items[idx]);
  },

  async deleteEntry(id: string): Promise<boolean> {
    let items = readStorage();
    const len = items.length;
    items = items.filter((item) => item.id !== id);
    writeStorage(items);
    return delay(200, items.length !== len);
  },
};
