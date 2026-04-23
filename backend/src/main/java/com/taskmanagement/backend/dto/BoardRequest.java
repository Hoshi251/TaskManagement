package com.taskmanagement.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record BoardRequest(
        @NotBlank String title
) {}
