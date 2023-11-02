package com.mesumo.msusers.models.service;

import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Activity;

public interface IActivityService extends ICRUDService<Activity>{
    Activity findByName(String name) throws ResourceNotFoundException;
}
