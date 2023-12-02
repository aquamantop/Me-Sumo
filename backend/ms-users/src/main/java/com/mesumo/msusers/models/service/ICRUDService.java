package com.mesumo.msusers.models.service;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.dto.UserDTO;
import java.util.Set;

public interface ICRUDService<T>{

    UserDTO findById(Long id) throws ResourceNotFoundException;
    Set<UserDTO> findAll();
    T create(T t) throws ResourceAlreadyExistsException;
    void deleteById(Long id) throws ResourceNotFoundException;
    T update(T t) throws ResourceNotFoundException;
}
