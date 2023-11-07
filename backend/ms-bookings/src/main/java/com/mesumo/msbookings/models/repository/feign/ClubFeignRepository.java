package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.models.dto.ClubDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClubFeignRepository implements IClubFeignClient {

    private final IClubFeignClient feignClient;

    @Override
    public ClubDTO getById(Long id) {
        ClubDTO response = feignClient.getById(id);
        return response;
    }
}
