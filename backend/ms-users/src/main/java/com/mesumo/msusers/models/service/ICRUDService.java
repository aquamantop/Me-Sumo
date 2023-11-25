package com.mesumo.msusers.models.service;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;

import java.util.Set;

public interface ICRUDService<T>{

    T findById(Long id) throws ResourceNotFoundException;
    Set<T> findAll();
    T create(T t) throws ResourceAlreadyExistsException;
    void deleteById(Long id) throws ResourceNotFoundException;
    T update(T t) throws ResourceNotFoundException;
}
