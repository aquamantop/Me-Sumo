package com.mesumo.msclubs.models.mappers;

import com.mesumo.msclubs.models.dto.NeighborhoodDTO;
import com.mesumo.msclubs.models.entities.Neighborhood;
import org.modelmapper.ModelMapper;

public class NeighborhoodMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public NeighborhoodDTO convertToDto(Neighborhood neighborhood) {
        return modelMapper.map(neighborhood, NeighborhoodDTO.class);
    }

    public Neighborhood convertToEntity(NeighborhoodDTO neighborhoodDTO) {
        return modelMapper.map(neighborhoodDTO, Neighborhood.class);
    }
}
