package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.config.feign.FeignConfig;
import com.mesumo.msbookings.models.dto.ClubDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(url="http://ec2-54-166-158-177.compute-1.amazonaws.com:8080/club",name = "ms-clubs", configuration = FeignConfig.class)
public interface IClubFeignClient {
    @GetMapping("/{id}")
    ClubDTO getById(@PathVariable Long id);

}
