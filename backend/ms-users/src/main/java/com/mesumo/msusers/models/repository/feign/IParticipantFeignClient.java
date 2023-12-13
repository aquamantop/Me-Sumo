package com.mesumo.msusers.models.repository.feign;

import com.mesumo.msusers.config.feign.FeignConfig;
import com.mesumo.msusers.models.entities.dto.ParticipantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@FeignClient(url = "http://ec2-54-198-112-83.compute-1.amazonaws.com:8084/booking", name = "ms-bookings", configuration = FeignConfig.class)
public interface IParticipantFeignClient {

    @GetMapping("/get-participant/{userId}")
    List<ParticipantDTO> getParticipantByUserId(@PathVariable Long userId);

    @PutMapping("/participant/update")
    void updateParticipant(@RequestBody ParticipantDTO participant);

}
