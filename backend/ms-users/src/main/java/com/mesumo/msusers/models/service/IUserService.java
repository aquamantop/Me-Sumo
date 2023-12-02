package com.mesumo.msusers.models.service;

import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.entities.dto.UserDTO;

public interface IUserService extends ICRUDService<User>{
    UserDTO findByEmail(String email) throws ResourceNotFoundException;

}
