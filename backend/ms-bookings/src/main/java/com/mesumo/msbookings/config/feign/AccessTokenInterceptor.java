package com.mesumo.msbookings.config.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class AccessTokenInterceptor implements RequestInterceptor{

    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        String accessToken = attributes.getRequest().getHeader("Authorization");

        template.header("Authorization", accessToken);
    }

}
