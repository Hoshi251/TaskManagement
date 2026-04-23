import client from './client';
import type { Board, BoardSummary, TaskList, Card } from '../types';

export const fetchBoards = (): Promise<BoardSummary[]> =>
  client.get<BoardSummary[]>('/boards').then((r) => r.data);

export const fetchBoard = (id: number): Promise<Board> =>
  client.get<Board>(`/boards/${id}`).then((r) => r.data);

export const createBoard = (title: string): Promise<BoardSummary> =>
  client.post<BoardSummary>('/boards', { title }).then((r) => r.data);

export const createList = (boardId: number, title: string): Promise<TaskList> =>
  client.post<TaskList>(`/boards/${boardId}/lists`, { title }).then((r) => r.data);

export const createCard = (listId: number, title: string, description?: string): Promise<Card> =>
  client.post<Card>(`/lists/${listId}/cards`, { title, description }).then((r) => r.data);
