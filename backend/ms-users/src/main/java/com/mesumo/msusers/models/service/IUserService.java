package com.mesumo.msusers.models.service;

import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;


public interface IUserService extends ICRUDService<User>{
    User findByEmail(String email) throws ResourceNotFoundException;



}
