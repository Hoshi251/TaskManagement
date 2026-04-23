import { useState } from 'react';
import type { TaskList } from '../types';
import KanbanCard from './KanbanCard';
import { useBoardStore } from '../store/boardStore';

type Props = {
  list: TaskList;
};

export default function KanbanColumn({ list }: Props) {
  const { createCard } = useBoardStore();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createCard(list.id, title.trim());
      setTitle('');
      setAdding(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-100 rounded-xl p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">{list.title}</h3>
      <div className="flex flex-col gap-2 min-h-8">
        {list.cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>

      {adding ? (
        <form onSubmit={handleAdd} className="mt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="カードのタイトル"
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving || !title.trim()}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-500 disabled:opacity-50"
            >
              {saving ? '追加中...' : 'カードを追加'}
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setTitle(''); }}
              className="text-gray-500 hover:text-gray-700 text-xs px-2"
            >
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 w-full text-left text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg px-2 py-1.5 transition-colors"
        >
          + カードを追加
        </button>
      )}
    </div>
  );
}
