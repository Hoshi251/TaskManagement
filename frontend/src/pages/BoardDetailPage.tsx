import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoardStore } from '../store/boardStore';
import KanbanColumn from '../components/KanbanColumn';

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedBoard, isLoading, error, fetchBoard } = useBoardStore();

  useEffect(() => {
    if (id) fetchBoard(Number(id));
  }, [id, fetchBoard]);

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
        </div>
      </main>
    </div>
  );
}
