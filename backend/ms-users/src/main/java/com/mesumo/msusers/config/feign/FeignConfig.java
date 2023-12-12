package com.mesumo.msusers.config.feign;

import feign.RequestInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FeignConfig {

    private final AccessTokenInterceptor accessTokenInterceptor;

    @Bean
    public RequestInterceptor requestInterceptor() {
        return accessTokenInterceptor;
    }

}

