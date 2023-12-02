package com.mesumo.msclubs.models.mappers;

import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.entities.Club;
import org.modelmapper.ModelMapper;

public class ClubMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public ClubDTO convertToDto(Club club) {
        modelMapper.addConverter(new PersistentSetToSetConverter());
        return modelMapper.map(club, ClubDTO.class);
    }

    public Club convertToEntity(ClubDTO clubDTO) {
        return modelMapper.map(clubDTO, Club.class);
    }


}
