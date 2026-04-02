package com.lab.demo.controller;

import com.lab.demo.dto.UserRegistrationRequest;
import com.lab.demo.dto.UserRegistrationResponse;
import com.lab.demo.model.UserRegistration;
import com.lab.demo.repository.UserRegistrationRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(originPatterns = {"http://localhost:*", "http://127.0.0.1:*", "https://*.run.app"})
public class UserRegistrationController {

    private final UserRegistrationRepository repository;

    public UserRegistrationController(UserRegistrationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserRegistrationResponse create(@Valid @RequestBody UserRegistrationRequest request) {
        UserRegistration entity = new UserRegistration();
        entity.setFullName(request.fullName().trim());
        entity.setEmail(request.email().trim().toLowerCase());
        entity.setPhone(
                request.phone() != null && !request.phone().isBlank() ? request.phone().trim() : null);
        UserRegistration saved = repository.save(entity);
        return new UserRegistrationResponse(
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getPhone(),
                saved.getCreatedAt());
    }
}
