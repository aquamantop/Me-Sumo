package com.mesumo.msclubs.models.service;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Court;

import java.util.List;

public interface ICourtService extends ICRUDService<Court> {

    List<Court> findByClubIdAndActivityId(Long clubId, Long activityId) throws ResourceNotFoundException;

    //Court findByClubId2 (Long clubId);

    //List<Court> findByClubActivityId(Long clubId);


}
