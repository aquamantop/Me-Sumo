package com.mesumo.msbookings.models.repository.feign;

import com.mesumo.msbookings.models.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserFeignRepository implements IUserFeignClient{


    @Qualifier("com.mesumo.msbookings.models.repository.feign.IUserFeignClient")
    @Autowired
    private final IUserFeignClient feignClient;

    @Override
    public UserDTO getById(Long id) {
        UserDTO response = feignClient.getById(id);
        return response;
    }
}
