import { useNavigate } from 'react-router-dom';
import type { BoardSummary } from '../types';

type Props = {
  board: BoardSummary;
};

export default function BoardCard({ board }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/boards/${board.id}`)}
      className="w-full text-left bg-white rounded-xl shadow hover:shadow-md border border-gray-200 p-5 transition-shadow cursor-pointer"
    >
      <h2 className="text-lg font-semibold text-gray-800 truncate">{board.title}</h2>
      <p className="mt-1 text-sm text-gray-400">
        {new Date(board.updatedAt).toLocaleDateString('ja-JP')} 更新
      </p>
    </button>
  );
}
