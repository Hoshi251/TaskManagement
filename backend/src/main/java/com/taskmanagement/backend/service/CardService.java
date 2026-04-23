package com.taskmanagement.backend.service;

import com.taskmanagement.backend.dto.CardResponse;
import com.taskmanagement.backend.entity.Card;
import com.taskmanagement.backend.repository.CardRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CardService {

    private final CardRepository cardRepository;

    public List<CardResponse> findByListId(Long listId) {
        return cardRepository.findByTaskListIdOrderByPositionAsc(listId)
                .stream()
                .map(CardResponse::new)
                .toList();
    }

    public CardResponse findById(Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card not found: " + id));
        return new CardResponse(card);
    }
}
