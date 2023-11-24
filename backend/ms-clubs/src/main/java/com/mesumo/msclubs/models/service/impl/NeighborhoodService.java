package com.mesumo.msclubs.models.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.dto.NeighborhoodDTO;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.entities.Neighborhood;
import com.mesumo.msclubs.models.repository.INeighborhood;
import com.mesumo.msclubs.models.service.INeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class NeighborhoodService implements INeighborhoodService {

    @Autowired
    INeighborhood neighborhoodRepository;

    /*
    @Autowired
    ObjectMapper mapper;*/

    /* Preguntas:
    * ¿Conviene usar ICRUDService con DTO o con la entidad directamente?
    * En el proyecto anterior agregamos endpoints para retornar DTOs y List<DTO> en los gets en lugar de la entidad directamente.
    * Y reservamos la entidad para los métodos de create, update y delete.
    * NeighborhoodDTO foundNeighborhood = mapper.convertValue(neighborhoodRepository.findById(id), NeighborhoodDTO.class);
    * Aquí hago todo con la entidad, pero lo cambiamos si quieren. */

    @Override
    public Neighborhood findById(Long id) throws ResourceNotFoundException {
        Optional<Neighborhood> neighborhood = neighborhoodRepository.findById(id);
        if (neighborhood.isEmpty()){
            throw new ResourceNotFoundException("Neighborhood not found");
        }

        return neighborhood.get();
    }

    @Override
    public Neighborhood create(Neighborhood neighborhood) {
        return null;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {

    }

    @Override
    public Neighborhood update(Neighborhood neighborhood) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public Set<Neighborhood> findAll() {

        List<Neighborhood> neighborhoods = neighborhoodRepository.findAll();

        return new HashSet<>(neighborhoods);
    }

    @Override
    public NeighborhoodDTO findByIdDTO(Long id) throws ResourceNotFoundException {
        Optional<Neighborhood> neighborhood = neighborhoodRepository.findById(id);

        if (neighborhood.isEmpty()){
            throw new ResourceNotFoundException("NeighborhoodDTO not found");
        }

        return neighborhoodToDTO(neighborhood.get());
    }

    @Override
    public Set<NeighborhoodDTO> findAllDTO() {
        List<Neighborhood> neighborhoods = neighborhoodRepository.findAll();
        Set<NeighborhoodDTO> neighborhoodDTOSet = new HashSet<>();

        for (Neighborhood neighborhood : neighborhoods) {
            NeighborhoodDTO dto = neighborhoodToDTO(neighborhood);
            neighborhoodDTOSet.add(dto);
        }

        return neighborhoodDTOSet;
    }

    static NeighborhoodDTO neighborhoodToDTO(Neighborhood neighborhood) {
        NeighborhoodDTO dto = new NeighborhoodDTO();
        dto.setName(neighborhood.getName());
        return dto;

    }
}
