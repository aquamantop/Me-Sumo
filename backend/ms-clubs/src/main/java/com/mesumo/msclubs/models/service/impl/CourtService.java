package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.repository.ICourtRepository;
import com.mesumo.msclubs.models.service.ICourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CourtService implements ICourtService {

    @Autowired
    ICourtRepository repository;
    @Override
    public Court findById(Long id) throws ResourceNotFoundException {
        Optional<Court> court = repository.findById(id);
        if(court.isEmpty()){
            throw new ResourceNotFoundException("Court not found");
        }
        return court.get();
    }

    @Override
    public Set<Court> findAll() {
        List<Court> courts = repository.findAll();
        return new HashSet<>(courts);
    }

    @Override
    public Court create(Court court) {
        return repository.save(court);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Court> court = repository.findById(id);
        if(court.isEmpty()){
            throw new ResourceNotFoundException("Court not found");
        }else {
            repository.deleteById(id);
            System.out.println("Court delete with id: " + id);
        }
    }

    @Override
    public Court update(Court court) throws ResourceNotFoundException {
        return null;
    }
}
