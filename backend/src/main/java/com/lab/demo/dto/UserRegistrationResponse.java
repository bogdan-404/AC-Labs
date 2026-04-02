package com.lab.demo.dto;

import java.time.Instant;

public record UserRegistrationResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        Instant createdAt
) {
}
