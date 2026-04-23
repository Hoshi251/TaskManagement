package com.taskmanagement.backend.controller;

import com.taskmanagement.backend.dto.BoardResponse;
import com.taskmanagement.backend.dto.BoardSummaryResponse;
import com.taskmanagement.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public List<BoardSummaryResponse> getAll() {
        return boardService.findAll();
    }

    @GetMapping("/{id}")
    public BoardResponse getById(@PathVariable Long id) {
        return boardService.findById(id);
    }
}
