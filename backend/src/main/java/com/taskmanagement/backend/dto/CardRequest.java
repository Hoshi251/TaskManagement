package com.taskmanagement.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record CardRequest(
        @NotBlank String title,
        String description
) {}
