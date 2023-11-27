package com.mesumo.msbookings.models.service.impl;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.entities.Participant;
import com.mesumo.msbookings.models.repository.IParticipantRepository;
import com.mesumo.msbookings.models.service.IParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParticipantService implements IParticipantService {

    @Autowired
    IParticipantRepository repository;

    @Override
    public Participant findById(Long id) throws ResourceNotFoundException {
        Optional<Participant> participant = repository.findById(id);
        if(participant.isEmpty()){
            throw new ResourceNotFoundException("Participant not found");
        }
        return participant.get();
    }

    @Override
    public Participant create(Participant participant) {
        return repository.save(participant);
    }

    @Override
    public Participant update(Participant participant) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
