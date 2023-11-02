package com.mesumo.msusers.models.service.impl;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.entities.Neighborhood;
import com.mesumo.msusers.models.repository.INeighborhoodRepository;
import com.mesumo.msusers.models.service.INeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class NeighborhoodService implements INeighborhoodService {

    @Autowired
    INeighborhoodRepository neighborhoodRepository ;

    @Override
    public Neighborhood findById(Long id) throws ResourceNotFoundException {
        Optional<Neighborhood> neighborhood = neighborhoodRepository.findById(id);
        if (neighborhood.isEmpty()){
            throw new ResourceNotFoundException("Neighborhood not found");
        }
        return neighborhood.get();
    }

    @Override
    public Set<Neighborhood> findAll() {
        List<Neighborhood> neighborhoods = neighborhoodRepository.findAll();
        return new HashSet<>(neighborhoods);
    }

    @Override
    public Neighborhood create(Neighborhood neighborhood) throws ResourceAlreadyExistsException {
        Neighborhood neighborhoodExists = neighborhoodRepository.findByName(neighborhood.getName());
        if(neighborhoodExists == null) {
            return neighborhoodRepository.save(neighborhood);
        }
        throw new ResourceAlreadyExistsException("Neighborhood already exists");
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {

    }

    @Override
    public Neighborhood update(Neighborhood activity) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public Neighborhood findByName(String name) throws ResourceNotFoundException {
        Neighborhood neighborhood = neighborhoodRepository.findByName(name);
        if (neighborhood==null){
            throw new ResourceNotFoundException("Neighborhood not found");
        }
        return neighborhood;
    }
}
