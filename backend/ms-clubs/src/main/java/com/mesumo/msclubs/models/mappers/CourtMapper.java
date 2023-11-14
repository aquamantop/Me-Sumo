package com.mesumo.msclubs.models.mappers;

import com.mesumo.msclubs.models.dto.CourtDTO;
import com.mesumo.msclubs.models.entities.Court;
import org.modelmapper.ModelMapper;

public class CourtMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public CourtDTO convertToDto(Court court) {
        return modelMapper.map(court, CourtDTO.class);
    }

    public Court convertToEntity(CourtDTO courtDTO) {
        return modelMapper.map(courtDTO, Court.class);
    }

}
