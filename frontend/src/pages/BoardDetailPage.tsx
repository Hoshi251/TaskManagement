import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoardStore } from '../store/boardStore';
import KanbanColumn from '../components/KanbanColumn';

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedBoard, isLoading, error, fetchBoard, createList } = useBoardStore();
  const [addingList, setAddingList] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [savingList, setSavingList] = useState(false);

  useEffect(() => {
    if (id) fetchBoard(Number(id));
  }, [id, fetchBoard]);

  const handleAddList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBoard || !listTitle.trim()) return;
    setSavingList(true);
    try {
      await createList(selectedBoard.id, listTitle.trim());
      setListTitle('');
      setAddingList(false);
    } finally {
      setSavingList(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!selectedBoard) return null;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="text-sm bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded transition-colors"
        >
          ← 一覧に戻る
        </button>
        <h1 className="text-lg font-bold">{selectedBoard.title}</h1>
      </header>

      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 items-start">
          {selectedBoard.lists.map((list) => (
            <KanbanColumn key={list.id} list={list} />
          ))}

          {addingList ? (
            <form
              onSubmit={handleAddList}
              className="flex-shrink-0 w-72 bg-gray-100 rounded-xl p-3"
            >
              <input
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                placeholder="リストのタイトル"
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={savingList || !listTitle.trim()}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-500 disabled:opacity-50"
                >
                  {savingList ? '追加中...' : 'リストを追加'}
                </button>
                <button
                  type="button"
                  onClick={() => { setAddingList(false); setListTitle(''); }}
                  className="text-gray-500 hover:text-gray-700 text-xs px-2"
                >
                  キャンセル
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setAddingList(true)}
              className="flex-shrink-0 w-72 bg-white/60 hover:bg-white/80 text-gray-600 hover:text-gray-800 rounded-xl p-3 text-sm font-medium transition-colors text-left"
            >
              + リストを追加
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
