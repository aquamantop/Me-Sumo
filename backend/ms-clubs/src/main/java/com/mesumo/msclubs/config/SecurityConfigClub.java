package com.mesumo.msclubs.config;

import com.mesumo.msclubs.config.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfigClub {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable);
        http
                .authorizeHttpRequests(authRequest -> authRequest
                        // CLUB ENDPOINTS
                        .requestMatchers(HttpMethod.POST,"/club/add").hasAnyRole("ADMIN", "CLUB")
                        .requestMatchers(HttpMethod.DELETE,"/club/delete/**").hasAnyRole("ADMIN", "CLUB")
                        .requestMatchers(HttpMethod.PUT, "/club/update").hasAnyRole("ADMIN", "CLUB")
                        // SLOT ENDPOINTS
                        .requestMatchers(HttpMethod.POST, "/slot/add").hasAnyRole( "ADMIN", "CLUB")
                        .requestMatchers(HttpMethod.PUT,"/slot/update").hasAnyRole("ADMIN", "CLUB")
                        .requestMatchers(HttpMethod.DELETE,"/slot/delete/**").hasAnyRole( "ADMIN", "CLUB")
                        // COURT ENDPOINTS
                        .requestMatchers(HttpMethod.POST, "/court/add").hasAnyRole("ADMIN", "CLUB")
                        .requestMatchers(HttpMethod.PUT,"/court/update").hasAnyRole("ADMIN", "CLUB")
                        .requestMatchers(HttpMethod.DELETE,"/court/delete/**").hasAnyRole("ADMIN", "CLUB")
                        .anyRequest().permitAll()
                );
        http
                .sessionManagement(sessionManager->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}