package com.mesumo.msclubs.models.service;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import java.util.List;

public interface ICRUDService<T> {
    T findById(Long id) throws ResourceNotFoundException;
    List<T> findAll();
    T create(T t);
    void deleteById(Long id) throws ResourceNotFoundException;
    T update(T t) throws ResourceNotFoundException;
}
