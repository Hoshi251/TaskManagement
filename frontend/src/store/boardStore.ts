import { create } from 'zustand';
import {
  fetchBoards as apiFetchBoards,
  fetchBoard as apiFetchBoard,
  createBoard as apiCreateBoard,
  createList as apiCreateList,
  createCard as apiCreateCard,
} from '../api/boards';
import type { Board, BoardSummary, TaskList, Card } from '../types';

type BoardStore = {
  boards: BoardSummary[];
  selectedBoard: Board | null;
  isLoading: boolean;
  error: string | null;
  fetchBoards: () => Promise<void>;
  fetchBoard: (id: number) => Promise<void>;
  createBoard: (title: string) => Promise<void>;
  createList: (boardId: number, title: string) => Promise<TaskList>;
  createCard: (listId: number, title: string, description?: string) => Promise<Card>;
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  selectedBoard: null,
  isLoading: false,
  error: null,

  fetchBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      const boards = await apiFetchBoards();
      set({ boards, isLoading: false });
    } catch {
      set({ error: 'ボードの取得に失敗しました', isLoading: false });
    }
  },

  fetchBoard: async (id: number) => {
    set({ isLoading: true, error: null, selectedBoard: null });
    try {
      const board = await apiFetchBoard(id);
      set({ selectedBoard: board, isLoading: false });
    } catch {
      set({ error: 'ボードの取得に失敗しました', isLoading: false });
    }
  },

  createBoard: async (title: string) => {
    const board = await apiCreateBoard(title);
    set((state) => ({ boards: [...state.boards, board] }));
  },

  createList: async (boardId: number, title: string) => {
    const list = await apiCreateList(boardId, title);
    set((state) => {
      if (!state.selectedBoard || state.selectedBoard.id !== boardId) return state;
      return {
        selectedBoard: {
          ...state.selectedBoard,
          lists: [...state.selectedBoard.lists, list],
        },
      };
    });
    return list;
  },

  createCard: async (listId: number, title: string, description?: string) => {
    const card = await apiCreateCard(listId, title, description);
    set((state) => {
      if (!state.selectedBoard) return state;
      return {
        selectedBoard: {
          ...state.selectedBoard,
          lists: state.selectedBoard.lists.map((l) =>
            l.id === listId ? { ...l, cards: [...l.cards, card] } : l
          ),
        },
      };
    });
    return card;
  },
}));
