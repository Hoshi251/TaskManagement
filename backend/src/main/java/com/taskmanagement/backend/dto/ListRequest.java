package com.taskmanagement.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ListRequest(
        @NotBlank String title
) {}
