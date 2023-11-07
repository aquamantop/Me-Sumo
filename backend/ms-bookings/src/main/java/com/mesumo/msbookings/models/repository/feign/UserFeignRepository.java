package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.models.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class UserFeignRepository implements IUserFeignClient{

    private final IUserFeignClient feignClient;

    @Override
    public UserDTO getById(Long id) {
        UserDTO response = feignClient.getById(id);
        return response;
    }
}
