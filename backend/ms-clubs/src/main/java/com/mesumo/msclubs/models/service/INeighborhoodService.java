package com.mesumo.msclubs.models.service;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.NeighborhoodDTO;
import com.mesumo.msclubs.models.entities.Neighborhood;

import java.util.Set;

public interface INeighborhoodService extends ICRUDService<Neighborhood>{
    NeighborhoodDTO findByIdDTO(Long id) throws ResourceNotFoundException;
    Set<NeighborhoodDTO> findAllDTO();
}
