package com.mesumo.msusers.auth;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.service.impl.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final EmailService emailService;

    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) throws ResourceNotFoundException {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws ResourceAlreadyExistsException {
        AuthResponse response = authService.register(request);

        if (!response.getToken().isEmpty()) {
            try {
                emailService.sendWelcomeEmail(request.getEmail());
            } catch (Exception e) {
                throw new RuntimeException("Error sending welcome email: " + e.getMessage(), e);
            }
        }

        return ResponseEntity.ok(response);
    }

}