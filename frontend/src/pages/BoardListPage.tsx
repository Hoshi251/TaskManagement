import { useEffect } from 'react';
import { useBoardStore } from '../store/boardStore';
import BoardCard from '../components/BoardCard';

export default function BoardListPage() {
  const { boards, isLoading, error, fetchBoards } = useBoardStore();

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">ボード一覧</h1>
      {boards.length === 0 ? (
        <p className="text-gray-400">ボードがありません</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  );
}
