package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.NeighborhoodDTO;
import com.mesumo.msclubs.models.entities.Neighborhood;
import com.mesumo.msclubs.models.mappers.NeighborhoodMapper;
import com.mesumo.msclubs.models.repository.INeighborhood;
import com.mesumo.msclubs.models.service.INeighborhoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class NeighborhoodService implements INeighborhoodService {

    private final INeighborhood neighborhoodRepository;

    private static final NeighborhoodMapper neighborhoodMapper = new NeighborhoodMapper();

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
    public void deleteById(Long id) {}

    @Override
    public Neighborhood update(Neighborhood neighborhood) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public List<Neighborhood> findAll() {
        return neighborhoodRepository.findAll();
    }

    @Override
    public NeighborhoodDTO findByIdDTO(Long id) throws ResourceNotFoundException {
        Optional<Neighborhood> neighborhood = neighborhoodRepository.findById(id);

        if (neighborhood.isEmpty()){
            throw new ResourceNotFoundException("NeighborhoodDTO not found");
        }

        return neighborhoodMapper.convertToDto(neighborhood.get());
    }

    @Override
    public List<NeighborhoodDTO> findAllDTO() {
        List<Neighborhood> list = neighborhoodRepository.findAll();
        List<NeighborhoodDTO> neighborhoodDTOS = new ArrayList<>();

        for (Neighborhood neighborhood : list) {
            NeighborhoodDTO dto = neighborhoodMapper.convertToDto(neighborhood);
            neighborhoodDTOS.add(dto);
        }

        return neighborhoodDTOS;
    }

}
