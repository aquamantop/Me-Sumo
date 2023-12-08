package com.mesumo.msbookings.config;

import com.mesumo.msbookings.config.jwt.JwtAuthenticationFilterBooking;
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
public class SecurityConfigBooking {

    private final JwtAuthenticationFilterBooking jwtAuthenticationFilterBooking;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable);
        http
                .authorizeHttpRequests(authRequest -> authRequest
                        .requestMatchers(HttpMethod.POST,"/booking/participant/**").hasAnyRole("ADMIN", "USER", "CLUB")
                        .requestMatchers(HttpMethod.POST,"/booking/add").hasAnyRole("ADMIN", "USER", "CLUB")
                        .requestMatchers(HttpMethod.PUT,"/booking/update").hasAnyRole("ADMIN", "USER", "CLUB")
                        .requestMatchers(HttpMethod.DELETE,"/booking/delete/**").hasAnyRole("ADMIN", "USER", "CLUB")
                        .requestMatchers(HttpMethod.DELETE,"/booking/participant/**").hasAnyRole("ADMIN", "USER", "CLUB")
                        .anyRequest().permitAll()
                );
        http
                .sessionManagement(sessionManager->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilterBooking, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}