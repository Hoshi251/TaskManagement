package com.taskmanagement.backend.service;

import com.taskmanagement.backend.dto.CardRequest;
import com.taskmanagement.backend.dto.CardResponse;
import com.taskmanagement.backend.entity.Card;
import com.taskmanagement.backend.entity.TaskList;
import com.taskmanagement.backend.repository.CardRepository;
import com.taskmanagement.backend.repository.TaskListRepository;
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
    private final TaskListRepository taskListRepository;

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

    @Transactional
    public CardResponse create(Long listId, CardRequest request) {
        TaskList taskList = taskListRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found: " + listId));
        int nextPosition = cardRepository.findByTaskListIdOrderByPositionAsc(listId).size();
        Card card = new Card();
        card.setTaskList(taskList);
        card.setTitle(request.title());
        card.setDescription(request.description());
        card.setPosition(nextPosition);
        return new CardResponse(cardRepository.save(card));
    }
}
