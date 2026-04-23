package com.taskmanagement.backend.dto;

import com.taskmanagement.backend.entity.TaskList;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ListResponse {

    private final Long id;
    private final Long boardId;
    private final String title;
    private final Integer position;
    private final List<CardResponse> cards;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public ListResponse(TaskList list) {
        this.id = list.getId();
        this.boardId = list.getBoard().getId();
        this.title = list.getTitle();
        this.position = list.getPosition();
        this.cards = list.getCards().stream().map(CardResponse::new).toList();
        this.createdAt = list.getCreatedAt();
        this.updatedAt = list.getUpdatedAt();
    }
}
