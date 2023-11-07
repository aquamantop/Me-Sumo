package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.config.feign.FeignConfig;
import com.mesumo.msbookings.models.dto.ClubDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ms-clubs", configuration = FeignConfig.class)
public interface IClubFeignClient {
    @GetMapping("/clubs")
    ClubDTO getById(@RequestParam Long id);
}
