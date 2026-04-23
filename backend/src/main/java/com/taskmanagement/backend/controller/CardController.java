package com.taskmanagement.backend.controller;

import com.taskmanagement.backend.dto.CardRequest;
import com.taskmanagement.backend.dto.CardResponse;
import com.taskmanagement.backend.service.CardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/lists/{listId}/cards")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponse create(@PathVariable Long listId, @Valid @RequestBody CardRequest request) {
        return cardService.create(listId, request);
    }
}
