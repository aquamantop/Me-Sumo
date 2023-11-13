package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Club;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.repository.ICourtRepository;
import com.mesumo.msclubs.models.service.ICourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CourtService implements ICourtService {

    @Autowired
    ICourtRepository repository;
    @Override
    public Court findById(Long id) throws ResourceNotFoundException {
        Optional<Court> court = repository.findById(id);
        if(court.isEmpty()){
            throw new ResourceNotFoundException("Court not found");
        }
        return court.get();
    }

    @Override
    public List<Court> findAll() {
        return repository.findAll();
    }

    @Override
    public Court create(Court court) {
        return repository.save(court);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Court> court = repository.findById(id);
        if(court.isEmpty()){
            throw new ResourceNotFoundException("Court not found");
        }else {
            repository.deleteById(id);
            System.out.println("Court delete with id: " + id);
        }
    }

    @Override
    public Court update(Court court) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public List<Court> findByClubIdAndActivityId(Long clubId, Long activityId) throws ResourceNotFoundException {
        List<Court> court = repository.findByClubIdAndActivityId(clubId,activityId);
        return court;
    }






    /*
    @Override
    public Court findByClubId(Long clubId, Long activityId) throws ResourceNotFoundException {
        System.out.println(clubId + " " + activityId );
        Court courtExists = repository.findByClubId(clubId,activityId);
        return courtExists;
    }*/

    /*
    @Override
    public Court findByClubId2(Long clubId) {
        Court courtExists = repository.findByClubId2(clubId);
        System.out.println(courtExists.getClub());
        return courtExists;
    }*/
}
