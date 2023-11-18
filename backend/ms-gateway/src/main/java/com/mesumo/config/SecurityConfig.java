package com.mesumo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityWebFilterChain (ServerHttpSecurity http) {
        http
                .cors(Customizer.withDefaults())
                .csrf(ServerHttpSecurity.CsrfSpec::disable);
        http
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers(HttpMethod.POST,"/auth/**").permitAll()
                        .pathMatchers(HttpMethod.POST,"/club/add").hasAnyRole("CLUB", "ADMIN")
                        .pathMatchers(HttpMethod.PUT,"/club/update").hasAnyRole("CLUB", "ADMIN")
                        .pathMatchers(HttpMethod.DELETE,"/club/delete/{id}").hasAnyRole("CLUB", "ADMIN")
                        .pathMatchers("/neighborhood/**").permitAll()
                        .pathMatchers("/activity/**").permitAll()
                        .pathMatchers("/user/**").hasRole("ADMIN")
                        .anyExchange().authenticated()
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Accept"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
