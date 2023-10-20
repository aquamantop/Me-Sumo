package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.service.IClubService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ClubService implements IClubService {

    @Override
    public ClubDTO findById(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ClubDTO create(ClubDTO clubDTO) {
        return null;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {

    }

    @Override
    public ClubDTO update(ClubDTO clubDTO) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public Set<ClubDTO> findAll() {
        return null;
    }
}
