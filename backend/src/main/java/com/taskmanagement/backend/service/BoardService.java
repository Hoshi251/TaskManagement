package com.taskmanagement.backend.service;

import com.taskmanagement.backend.dto.BoardResponse;
import com.taskmanagement.backend.dto.BoardSummaryResponse;
import com.taskmanagement.backend.entity.Board;
import com.taskmanagement.backend.repository.BoardRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;

    public List<BoardSummaryResponse> findAll() {
        return boardRepository.findAllByOrderByPositionAsc()
                .stream()
                .map(BoardSummaryResponse::new)
                .toList();
    }

    public BoardResponse findById(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found: " + id));
        return new BoardResponse(board);
    }
}
