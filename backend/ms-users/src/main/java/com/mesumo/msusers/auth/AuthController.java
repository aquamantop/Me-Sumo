package com.mesumo.msusers.auth;

import com.mesumo.msusers.exceptions.PasswordException;
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
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws ResourceAlreadyExistsException, PasswordException {
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

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@RequestBody PasswordRequest request) throws ResourceNotFoundException {
        AuthResponse response = authService.generateResetPasswordToken(request);

        if (!response.getToken().isEmpty()) {
            try {
                emailService.sendPasswordResetEmail(request.getEmail(), response.getToken());
            } catch (Exception e) {
                throw new RuntimeException("Error sending reset email: " + e.getMessage(), e);
            }
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestHeader("Authorization") String tokenHeader, @RequestBody NewPasswordRequest password) throws Exception {
        String token = tokenHeader.replace("Bearer ", "");
        authService.resetPassword(token, password.getPassword());
        return ResponseEntity.ok("Contraseña actualizada correctamente.");
    }


}