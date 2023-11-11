package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.entities.Club;
import com.mesumo.msclubs.models.entities.Neighborhood;
import com.mesumo.msclubs.models.repository.IClubRepository;
import com.mesumo.msclubs.models.service.IClubService;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ClubService implements IClubService {

    private final IClubRepository repository;

    public ClubService(IClubRepository repository) {
        this.repository = repository;
    }

    @Override
    public Club findById(Long id) throws ResourceNotFoundException {
        Optional<Club> club = repository.findById(id);

        if (club.isEmpty()){
            throw new ResourceNotFoundException("Club not found");
        }

        return club.get();
    }

    @Override
    public List<Club> findAll() {
        return repository.findAll();
    }

    @Override
    public Club create(Club club) {
        return repository.save(club);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Club> club = repository.findById(id);

        if (club.isEmpty()){
            throw new ResourceNotFoundException("Club not found");
        }
        repository.deleteById(id);
        System.out.println("Club delete with id: " + id);

    }

    @Override
    public Club update(Club club) throws ResourceNotFoundException {
        Optional<Club> newClub = repository.findById(club.getId());
        if (newClub.isPresent()) {

            if (club.getName() != null) {
                newClub.get().setName(club.getName());
            }

            if (club.getNeighborhood() != null) {
                newClub.get().setNeighborhood(club.getNeighborhood());
            }

            if (club.getAddress() != null) {
                newClub.get().setAddress(club.getAddress());
            }

            if (club.getActivities() != null) {
                newClub.get().setActivities(club.getActivities());
            }

            if (club.getAmenities() != null) {
                newClub.get().setAmenities(club.getAmenities());
            }

            if(club.getUrl() != null){
                newClub.get().setUrl(club.getUrl());
            }

            repository.save(newClub.get());
        } else System.err.println("Club not found with id: " + club.getId());

        return newClub.get();
    }

    @Override
    public ClubDTO findByIdDTO(Long id) throws ResourceNotFoundException {
        Optional<Club> club = repository.findById(id);

        if (club.isEmpty()){
            throw new ResourceNotFoundException("Club not found");
        }

        return clubToDTO(club.get());
    }

    @Override
    public List<ClubDTO> findAllDTO() {
        List<Club> clubs = repository.findAll();
        List<ClubDTO> clubDTO = new ArrayList<>();

        for (Club club : clubs) {
            ClubDTO dto = clubToDTO(club);
            clubDTO.add(dto);
        }

        return clubDTO;
    }

    public ClubDTO clubToDTO (Club club){
        ClubDTO clubDTO = new ClubDTO();
        clubDTO.setName(club.getName());
        Neighborhood neighborhood = club.getNeighborhood();
        clubDTO.setNeighborhood(NeighborhoodService.neighborhoodToDTO(neighborhood));

        Set<Activity> activities = club.getActivities();
        Set<ActivityDTO> activityDTOSet = new HashSet<>();
        for (Activity activity : activities) {
            ActivityDTO dto = ActivityService.activityToDTO(activity);
            activityDTOSet.add(dto);
        }
        clubDTO.setActivities(activityDTOSet);
        clubDTO.setUrl(club.getUrl());

        return clubDTO;
    }

}
