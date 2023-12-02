package com.mesumo.msclubs.models.service;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.entities.Club;
import java.util.List;

public interface IClubService extends ICRUDService<Club> {

    ClubDTO findByIdDTO(Long id) throws ResourceNotFoundException;
    List<ClubDTO> findAllDTO();

}
