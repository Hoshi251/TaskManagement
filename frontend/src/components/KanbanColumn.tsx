import type { TaskList } from '../types';
import KanbanCard from './KanbanCard';

type Props = {
  list: TaskList;
};

export default function KanbanColumn({ list }: Props) {
  return (
    <div className="flex-shrink-0 w-72 bg-gray-100 rounded-xl p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">{list.title}</h3>
      <div className="flex flex-col gap-2 min-h-8">
        {list.cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
