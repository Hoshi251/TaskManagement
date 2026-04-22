package com.taskmanagement.backend.repository;

import com.taskmanagement.backend.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByTaskListIdOrderByPositionAsc(Long listId);
}
