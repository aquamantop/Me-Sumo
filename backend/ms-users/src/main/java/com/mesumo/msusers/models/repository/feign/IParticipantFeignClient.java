package com.mesumo.msusers.models.repository.feign;

import com.mesumo.msusers.config.feign.FeignConfig;
import com.mesumo.msusers.models.entities.dto.ParticipantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(url = "http://ec2-54-198-112-83.compute-1.amazonaws.com:8084/booking", name = "ms-bookings", configuration = FeignConfig.class)
public interface IParticipantFeignClient {

    @PutMapping("/participant/update")
    void updateParticipant(ParticipantDTO participant);

}
