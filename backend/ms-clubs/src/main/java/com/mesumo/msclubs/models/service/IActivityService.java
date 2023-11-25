package com.mesumo.msclubs.models.service;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.entities.Activity;
import java.util.List;

public interface IActivityService extends ICRUDService<Activity>{
    ActivityDTO findByIdDTO(Long id) throws ResourceNotFoundException;
    List<ActivityDTO> findAllDTO();
}
