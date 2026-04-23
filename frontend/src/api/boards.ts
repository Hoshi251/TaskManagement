import client from './client';
import type { Board, BoardSummary } from '../types';

export const fetchBoards = (): Promise<BoardSummary[]> =>
  client.get<BoardSummary[]>('/boards').then((r) => r.data);

export const fetchBoard = (id: number): Promise<Board> =>
  client.get<Board>(`/boards/${id}`).then((r) => r.data);
