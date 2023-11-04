package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.config.feign.FeignConfig;
import com.mesumo.msbookings.models.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ms-users", configuration = FeignConfig.class)
public class UserFeignClient {
    @GetMapping("/users")
    UserDTO getById(@RequestParam Long id);
}
