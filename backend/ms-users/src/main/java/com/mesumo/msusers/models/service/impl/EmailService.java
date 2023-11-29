package com.mesumo.msusers.models.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.mail.SimpleMailMessage;

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
            Path path = new ClassPathResource("template/welcome-email-template.html").getFile().toPath();
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException e) {
            // Handle exception
            return "Error al cargar el template"; // Or throw a more specific exception
        }
    }

    public void sendPasswordResetEmail(String to, String token) {
        String htmlContent = loadResetEmailTemplate(token);

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

        try {
            helper.setTo(to);
            helper.setSubject("Restablecimiento de contraseña - Me Sumo");
            helper.setText(htmlContent, true); // Establece el contenido HTML

            emailSender.send(mimeMessage); // Envía el correo electrónico
        } catch (MessagingException e) {
            throw new RuntimeException(e); // Manejo de la excepción en caso de error al enviar el correo
        }
    }


    private String loadResetEmailTemplate(String token) {
        try {
            Path path = new ClassPathResource("template/reset-password-template.html").getFile().toPath();
            String content = Files.readString(path, StandardCharsets.UTF_8);
            return content.replace("INSERT_TOKEN_HERE", token);
        } catch (IOException e) {
            // Handle exception
            return "Error al cargar el template";
        }
    }
}
