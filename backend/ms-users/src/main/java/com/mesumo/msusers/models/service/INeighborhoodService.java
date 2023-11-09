package com.mesumo.msusers.models.service;

import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Neighborhood;

public interface INeighborhoodService extends ICRUDService<Neighborhood>{
    Neighborhood findByName(String name) throws ResourceNotFoundException;
}