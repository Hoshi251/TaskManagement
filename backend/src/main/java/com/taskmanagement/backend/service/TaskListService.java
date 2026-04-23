package com.taskmanagement.backend.service;

import com.taskmanagement.backend.dto.ListRequest;
import com.taskmanagement.backend.dto.ListResponse;
import com.taskmanagement.backend.entity.Board;
import com.taskmanagement.backend.entity.TaskList;
import com.taskmanagement.backend.repository.BoardRepository;
import com.taskmanagement.backend.repository.TaskListRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TaskListService {

    private final TaskListRepository taskListRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public ListResponse create(Long boardId, ListRequest request) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityNotFoundException("Board not found: " + boardId));
        int nextPosition = taskListRepository.findByBoardIdOrderByPositionAsc(boardId).size();
        TaskList list = new TaskList();
        list.setBoard(board);
        list.setTitle(request.title());
        list.setPosition(nextPosition);
        return new ListResponse(taskListRepository.save(list));
    }
}
