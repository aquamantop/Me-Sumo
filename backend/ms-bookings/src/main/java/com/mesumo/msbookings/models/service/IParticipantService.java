package com.mesumo.msbookings.models.service;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.entities.Participant;

public interface IParticipantService {

    Participant findById(Long id) throws ResourceNotFoundException;
    Participant create(Participant participant);
    Participant update(Participant participant);
    void deleteById(Long id);

}
