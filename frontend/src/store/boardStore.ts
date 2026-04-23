import { create } from 'zustand';
import { fetchBoards as apiFetchBoards, fetchBoard as apiFetchBoard } from '../api/boards';
import type { Board, BoardSummary } from '../types';

type BoardStore = {
  boards: BoardSummary[];
  selectedBoard: Board | null;
  isLoading: boolean;
  error: string | null;
  fetchBoards: () => Promise<void>;
  fetchBoard: (id: number) => Promise<void>;
};

export const useBoardStore = create<BoardStore>((set) => ({
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
}));
