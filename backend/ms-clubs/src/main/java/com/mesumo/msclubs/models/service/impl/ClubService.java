package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.entities.Club;
import com.mesumo.msclubs.models.repository.IClubRepository;
import com.mesumo.msclubs.models.service.IClubService;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    public Set<Club> findAll() {
        List<Club> clubs = repository.findAll();
        return new HashSet<>(clubs);
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
        else {
            repository.deleteById(id);
            System.out.println("Club delete with id: " + id);
        }
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
    public Set<ClubDTO> findAllDTO() {
        List<Club> clubs = repository.findAll();
        Set<ClubDTO> clubDTOSet = new HashSet<>();

        for (Club club : clubs) {
            ClubDTO dto = clubToDTO(club);
            clubDTOSet.add(dto);
        }

        return clubDTOSet;
    }

    public ClubDTO clubToDTO (Club club){
        ClubDTO dto = new ClubDTO();
        dto.setName(club.getName());
        dto.setNeighborhood(club.getNeighborhood());
        dto.setActivities(club.getActivities());

        return dto;
    }

}
