import { useEffect, useState } from 'react';
import { addNote, getAllNotes, deleteNote, type Note } from '@/lib/notesDB';

export function NoteSidebar() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    (async () => {
      const storedNotes = await getAllNotes();
      setNotes(storedNotes);
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !startTime || !endTime) return;

    const timeRange = `${startTime}–${endTime}`;
    const newNote = { timeRange, content, createdAt: Date.now() };
    const fakeId = Date.now();
    await addNote(newNote);
    setNotes([...notes, { ...newNote, id: fakeId }]);
    setContent('');
    setStartTime('');
    setEndTime('');
  }

  async function handleDelete(id: number) {
    await deleteNote(id);
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <aside className="flex flex-col h-full w-full max-w-md bg-[#1c1c1e] text-white border-l border-[#333]">
      {/* Header */}
      <div className="p-6 pb-3">
        <h2 className="text-2xl font-bold tracking-wide">📝 Your Notes</h2>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="text-center text-[#777] pt-12 text-base italic">
            No work done yet. Don’t be a lazy monkey 🐒!
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="relative bg-[#2c2c2e] p-4 rounded-xl border border-[#3a3a3c] shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            >
              <div className="text-sm text-[#9e9e9f] mb-1 font-mono">{note.timeRange}</div>
              <div className="text-base leading-relaxed">{note.content}</div>
              <button
                onClick={() => handleDelete(note.id)}
                className="absolute top-3 right-3 text-lg text-[#ff5f56] hover:text-red-400 transition-colors"
                title="Delete Note"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 bg-[#1c1c1e] border-t border-[#333] px-6 py-4 flex flex-col gap-3"
      >
        <div className="flex gap-3">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-1/2 bg-[#2c2c2e] p-2 rounded-lg text-white border border-[#444] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-1/2 bg-[#2c2c2e] p-2 rounded-lg text-white border border-[#444] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
            required
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you work on?"
          className="bg-[#2c2c2e] p-2 rounded-lg border border-[#444] text-white text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
        />
        <button
          type="submit"
          className="bg-[#155595] hover:bg-[#0066cc] text-white py-2 rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg"
        >
          Save Note
        </button>
      </form>
    </aside>
  );
}
