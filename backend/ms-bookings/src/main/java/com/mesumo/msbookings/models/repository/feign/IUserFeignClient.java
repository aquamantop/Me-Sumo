package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.config.feign.FeignConfig;
import com.mesumo.msbookings.models.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(url="http://ec2-3-85-198-231.compute-1.amazonaws.com:8081/user", name = "ms-users", configuration = FeignConfig.class)
public interface IUserFeignClient {

    @GetMapping("/{id}")
    UserDTO getById(@PathVariable Long id);

}
