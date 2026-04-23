export type BoardSummary = {
  id: number;
  title: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type Card = {
  id: number;
  listId: number;
  title: string;
  description: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type TaskList = {
  id: number;
  boardId: number;
  title: string;
  position: number;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
};

export type Board = {
  id: number;
  title: string;
  position: number;
  lists: TaskList[];
  createdAt: string;
  updatedAt: string;
};
