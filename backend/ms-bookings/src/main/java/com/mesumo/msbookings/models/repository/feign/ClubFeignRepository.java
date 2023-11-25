package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.models.dto.ClubDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClubFeignRepository implements IClubFeignClient {

    @Qualifier("com.mesumo.msbookings.models.repository.feign.IClubFeignClient")
    @Autowired
    private final IClubFeignClient feignClient;

    @Override
    public ClubDTO getById(Long id) {
        ClubDTO response = feignClient.getById(id);
        return response;
    }

}