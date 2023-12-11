package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Amenity;
import com.mesumo.msclubs.models.repository.IAmenityRepository;
import com.mesumo.msclubs.models.service.IAmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AmenityService implements IAmenityService {

    private final IAmenityRepository repository;
    @Override
    public Amenity findById(Long id) throws ResourceNotFoundException {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Amenity not found"));
    }

    @Override
    public List<Amenity> findAll() {
        return repository.findAll();
    }

    @Override
    public Amenity create(Amenity amenity) {
        return null;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
    }

    @Override
    public Amenity update(Amenity amenity) throws ResourceNotFoundException {
        return null;
    }

}
