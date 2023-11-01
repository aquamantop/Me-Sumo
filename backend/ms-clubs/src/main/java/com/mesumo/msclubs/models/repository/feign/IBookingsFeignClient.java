package com.mesumo.msclubs.models.repository.feign;

import com.mesumo.msclubs.config.feign.FeignConfig;
import com.mesumo.msclubs.models.dto.BookingDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ms-booking", configuration = FeignConfig.class)
public interface IBookingsFeignClient {

    @GetMapping("/api/v1/booking")
    List<BookingDTO> getAll(@RequestParam String clubId);
}
