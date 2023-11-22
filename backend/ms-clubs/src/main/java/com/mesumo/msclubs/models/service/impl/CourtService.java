package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.CourtDTO;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.mappers.CourtMapper;
import com.mesumo.msclubs.models.repository.ICourtRepository;
import com.mesumo.msclubs.models.service.ICourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourtService implements ICourtService {

    @Autowired
    ICourtRepository repository;

    private static final CourtMapper courtMapper = new CourtMapper();

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
    public List<CourtDTO> findByClubIdAndActivityId(Long clubId, Long activityId) throws ResourceNotFoundException {
        List<Court> courts = repository.findByClubIdAndActivityId(clubId, activityId);

        if(courts.isEmpty()) throw new ResourceNotFoundException("Courts not found");

        List<CourtDTO> courtsDTO = new ArrayList<>();
        courts.forEach(c -> courtsDTO.add(courtMapper.convertToDto(c)));

        return courtsDTO;
    }

}
