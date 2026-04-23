package com.taskmanagement.backend.controller;

import com.taskmanagement.backend.dto.CardResponse;
import com.taskmanagement.backend.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("/lists/{listId}/cards")
    public List<CardResponse> getByListId(@PathVariable Long listId) {
        return cardService.findByListId(listId);
    }

    @GetMapping("/cards/{id}")
    public CardResponse getById(@PathVariable Long id) {
        return cardService.findById(id);
    }
}
