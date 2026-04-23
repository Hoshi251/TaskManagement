package com.taskmanagement.backend.controller;

import com.taskmanagement.backend.dto.BoardRequest;
import com.taskmanagement.backend.dto.BoardResponse;
import com.taskmanagement.backend.dto.BoardSummaryResponse;
import com.taskmanagement.backend.dto.ListRequest;
import com.taskmanagement.backend.dto.ListResponse;
import com.taskmanagement.backend.service.BoardService;
import com.taskmanagement.backend.service.TaskListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final TaskListService taskListService;

    @GetMapping
    public List<BoardSummaryResponse> getAll() {
        return boardService.findAll();
    }

    @GetMapping("/{id}")
    public BoardResponse getById(@PathVariable Long id) {
        return boardService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BoardSummaryResponse create(@Valid @RequestBody BoardRequest request) {
        return boardService.create(request);
    }

    @PostMapping("/{boardId}/lists")
    @ResponseStatus(HttpStatus.CREATED)
    public ListResponse createList(@PathVariable Long boardId, @Valid @RequestBody ListRequest request) {
        return taskListService.create(boardId, request);
    }
}
