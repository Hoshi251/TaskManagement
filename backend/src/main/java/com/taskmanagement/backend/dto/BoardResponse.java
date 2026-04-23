package com.taskmanagement.backend.dto;

import com.taskmanagement.backend.entity.Board;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class BoardResponse {

    private final Long id;
    private final String title;
    private final Integer position;
    private final List<ListResponse> lists;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public BoardResponse(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.position = board.getPosition();
        this.lists = board.getLists().stream().map(ListResponse::new).toList();
        this.createdAt = board.getCreatedAt();
        this.updatedAt = board.getUpdatedAt();
    }
}
