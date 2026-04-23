package com.taskmanagement.backend.dto;

import com.taskmanagement.backend.entity.Board;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardSummaryResponse {

    private final Long id;
    private final String title;
    private final Integer position;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public BoardSummaryResponse(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.position = board.getPosition();
        this.createdAt = board.getCreatedAt();
        this.updatedAt = board.getUpdatedAt();
    }
}
