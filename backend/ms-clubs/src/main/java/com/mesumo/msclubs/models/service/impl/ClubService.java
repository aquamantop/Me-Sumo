package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.entities.Amenity;
import com.mesumo.msclubs.models.entities.Club;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.mappers.ClubMapper;
import com.mesumo.msclubs.models.repository.IClubRepository;
import com.mesumo.msclubs.models.service.IClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService implements IClubService {

    private final IClubRepository repository;

    private static final ClubMapper clubMapper = new ClubMapper();

    @Override
    public Club findById(Long id) throws ResourceNotFoundException {
        Optional<Club> club = repository.findById(id);

        if (club.isEmpty()) {
            throw new ResourceNotFoundException("Club not found");
        }

        Set<Activity> filteredActivities = new HashSet<>();

        for (Activity activity : club.get().getActivities()) {
            Set<Court> filteredCourts = activity.getCourts().stream()
                    .filter(court -> Objects.equals(court.getClub().getId(), club.get().getId()))
                    .collect(Collectors.toSet());

            if (!filteredCourts.isEmpty()) {
                Activity filteredActivity = new Activity();
                filteredActivity.setId(activity.getId());
                filteredActivity.setName(activity.getName());
                filteredActivity.setType(activity.getType());
                filteredActivity.setCourts(filteredCourts);
                filteredActivities.add(filteredActivity);
            }
        }

        club.get().setActivities(filteredActivities);

        return club.get();
    }

    @Override
    public List<Club> findAll() {
        List<Club> clubs = repository.findAll();

        for (Club club : clubs) {
            Set<Activity> filteredActivities = new HashSet<>();
            for (Activity activity : club.getActivities()) {
                Set<Court> filteredCourts = activity.getCourts().stream()
                        .filter(court -> Objects.equals(court.getClub().getId(), club.getId()))
                        .collect(Collectors.toSet());

                if (!filteredCourts.isEmpty()) {
                    Activity filteredActivity = new Activity();
                    filteredActivity.setId(activity.getId());
                    filteredActivity.setName(activity.getName());
                    filteredActivity.setType(activity.getType());
                    filteredActivity.setCourts(filteredCourts);
                    filteredActivities.add(filteredActivity);
                }
            }

            club.setActivities(filteredActivities);
        }

        return clubs;
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

            if (club.getDescription() != null) {
                newClub.get().setDescription(club.getDescription());
            }

            if (club.getAddress() != null) {
                newClub.get().setAddress(club.getAddress());
            }

            if (club.getActivities() != null) {
                Set<Activity> newActivities = newClub.get().getActivities();
                Set<Activity> activities = club.getActivities();
                activities.forEach(activity -> {
                    AtomicInteger cont = new AtomicInteger();
                    newActivities.forEach(activity1 -> {
                        if (Objects.equals(activity.getId(), activity1.getId())){
                            cont.getAndIncrement();
                        }
                    });
                    if(cont.get() == 0) {
                        newActivities.add(activity);
                    }
                });
                newClub.get().setActivities(newActivities);
            }

            if (club.getAmenities() != null) {
                Set<Amenity> newAmenities = newClub.get().getAmenities();
                Set<Amenity> amenities = club.getAmenities();
                amenities.forEach(amenity -> {
                    AtomicInteger cont = new AtomicInteger();
                    newAmenities.forEach(amenity1 -> {
                        if (Objects.equals(amenity.getId(), amenity1.getId())){
                            cont.getAndIncrement();
                        }
                    });
                    if(cont.get() == 0) {
                        newAmenities.add(amenity);
                    }
                });
                newClub.get().setAmenities(newAmenities);
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

        Set<Activity> filteredActivities = new HashSet<>();

        for (Activity activity : club.get().getActivities()) {
            Set<Court> filteredCourts = activity.getCourts().stream()
                    .filter(court -> Objects.equals(court.getClub().getId(), club.get().getId()))
                    .collect(Collectors.toSet());

            if (!filteredCourts.isEmpty()) {
                Activity filteredActivity = new Activity();
                filteredActivity.setId(activity.getId());
                filteredActivity.setName(activity.getName());
                filteredActivity.setType(activity.getType());
                filteredActivity.setCourts(filteredCourts);
                filteredActivities.add(filteredActivity);
            }
        }

        club.get().setActivities(filteredActivities);

        return clubMapper.convertToDto(club.get());
    }

    @Override
    public List<ClubDTO> findAllDTO() {
        List<Club> clubs = repository.findAll();
        List<ClubDTO> clubDTO = new ArrayList<>();

        for (Club club : clubs) {
            Set<Activity> filteredActivities = new HashSet<>();

            for (Activity activity : club.getActivities()) {
                Set<Court> filteredCourts = activity.getCourts().stream()
                        .filter(court -> Objects.equals(court.getClub().getId(), club.getId()))
                        .collect(Collectors.toSet());

                if (!filteredCourts.isEmpty()) {
                    Activity filteredActivity = new Activity();
                    filteredActivity.setId(activity.getId());
                    filteredActivity.setName(activity.getName());
                    filteredActivity.setType(activity.getType());
                    filteredActivity.setCourts(filteredCourts);
                    filteredActivities.add(filteredActivity);
                }
            }

            club.setActivities(filteredActivities);
            ClubDTO dto = clubMapper.convertToDto(club);
            clubDTO.add(dto);
        }

        return clubDTO;
    }

}
