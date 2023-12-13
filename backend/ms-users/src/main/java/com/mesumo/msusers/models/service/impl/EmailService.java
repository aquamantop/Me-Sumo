package com.mesumo.msusers.models.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    public void sendWelcomeEmail(String email) {

        String htmlContent = loadWelcomeEmailTemplate();

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

        try {
            helper.setTo(email);
            helper.setSubject("Bienvenid@ a Me Sumo");
            helper.setText(htmlContent, true);

            emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String loadWelcomeEmailTemplate() {
        try {
            InputStream inputStream = getClass().getResourceAsStream("/template/welcome-email-template.html");

            if (inputStream != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                    return reader.lines().collect(Collectors.joining(System.lineSeparator()));
                }
            } else {
                return "Error al cargar el template: InputStream es nulo";
            }
        } catch (IOException e) {
            return "Error al cargar el template: " + e.getMessage();
        }
    }

    public void sendPasswordResetEmail(String to, String token) {
        String htmlContent = loadResetEmailTemplate(token);

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

        try {
            helper.setTo(to);
            helper.setSubject("Restablecimiento de contraseña - Me Sumo");
            helper.setText(htmlContent, true);

            emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String loadResetEmailTemplate(String token) {
        try {
            InputStream inputStream = getClass().getResourceAsStream("/template/reset-password-template.html");

            if (inputStream != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                    String content = reader.lines().collect(Collectors.joining(System.lineSeparator()));
                    return content.replace("INSERT_TOKEN_HERE", token);
                }
            } else {
                return "Error al cargar el template: InputStream es nulo";
            }
        } catch (IOException e) {
            return "Error al cargar el template: " + e.getMessage();
        }
    }

}
