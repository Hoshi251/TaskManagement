import type { Card } from '../types';

type Props = {
  card: Card;
};

export default function KanbanCard({ card }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <p className="text-sm font-medium text-gray-800">{card.title}</p>
      {card.description && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{card.description}</p>
      )}
    </div>
  );
}
