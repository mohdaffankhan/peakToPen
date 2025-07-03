import { openDB } from 'idb';

export interface Note {
  id: number;
  timeRange: string;
  content: string;
  createdAt: number;
}

const DB_NAME = 'peakToPenDB';
const STORE_NAME = 'notes';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});

export async function addNote(note: Omit<Note, 'id'>): Promise<void> {
  const db = await dbPromise;
  await db.add(STORE_NAME, note);
}

export async function getAllNotes(): Promise<Note[]> {
  const db = await dbPromise;
  const notes = await db.getAll(STORE_NAME);
  return notes.sort((a, b) => a.createdAt - b.createdAt);
}

export async function deleteNote(id: number): Promise<void> {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
}

export async function clearAllNotes(): Promise<void> {
  const db = await dbPromise;
  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  await store.clear();
  await tx.done;
}