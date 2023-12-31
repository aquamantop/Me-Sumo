package com.mesumo.msusers.models.repository.feign;

import com.mesumo.msusers.models.entities.dto.ParticipantDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ParticipantRepository implements IParticipantFeignClient {

    @Qualifier("com.mesumo.msusers.models.repository.feign.IParticipantFeignClient")
    private final IParticipantFeignClient feignClient;

    @Override
    public List<ParticipantDTO> getParticipantByUserId(Long userId) {
        return feignClient.getParticipantByUserId(userId);
    }

    @Override
    public void updateParticipant(ParticipantDTO participant) {
        feignClient.updateParticipant(participant);
    }

}
