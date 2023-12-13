package com.mesumo.msbookings.models.service.impl;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.entities.Participant;
import com.mesumo.msbookings.models.repository.IParticipantRepository;
import com.mesumo.msbookings.models.service.IParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public void update(Participant participant) {
        List<Participant> participantList = repository.findByUserId(participant.getUserId());
        if (!participantList.isEmpty()) {
            participantList.forEach(participant1 -> {
                if (participant.getFirstName() != null) participant1.setFirstName(participant.getFirstName());
                if (participant.getLastName() != null) participant1.setLastName(participant.getLastName());
                repository.save(participant1);
            });
        }
    }

    public List<Participant> findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
