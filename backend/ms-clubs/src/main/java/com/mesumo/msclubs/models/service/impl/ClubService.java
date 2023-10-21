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
    public ClubDTO findById(Long id) throws ResourceNotFoundException {
        Optional<Club> club = repository.findById(id);

        if (club.isEmpty()){
            throw new ResourceNotFoundException("Club not found");
        }

        return clubToDTO(club.get());
    }

    @Override
    public ClubDTO create(ClubDTO dto) {
        Club club = repository.save(DTOToClub(dto));
        dto.setId(club.getId());
        return dto;
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
    public ClubDTO update(ClubDTO dto) throws ResourceNotFoundException {
        Optional<Club> c = repository.findById(dto.getId());
        ClubDTO club = null;
        if (c.isPresent()) {
            club = clubToDTO(c.get());

            if (dto.getName() != null) {
                club.setName(dto.getName());
            }

            if (dto.getNeighborhood() != null) {
                club.setNeighborhood(dto.getNeighborhood());
            }

            if (dto.getAddress() != null) {
                club.setAddress(dto.getAddress());
            }

            if (dto.getActivities() != null) {
                club.setActivities(dto.getActivities());
            }

            if (dto.getAmenities() != null) {
                club.setAmenities(dto.getAmenities());
            }

            repository.save(DTOToClub(club));
        } else System.err.println("Club not found with id: " + dto.getId());

        return club;
    }

    @Override
    public Set<ClubDTO> findAll() {
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
        dto.setId(club.getId());
        dto.setName(club.getName());
        dto.setNeighborhood(club.getNeighborhood());
        dto.setAddress(club.getAddress());
        dto.setActivities(club.getActivities());
        dto.setAmenities(club.getAmenities());

        return dto;
    }

    public Club DTOToClub (ClubDTO dto){
        Club club = new Club();
        club.setId(dto.getId());
        club.setName(dto.getName());
        club.setNeighborhood(dto.getNeighborhood());
        club.setAddress(dto.getAddress());
        club.setActivities(dto.getActivities());
        club.setAmenities(dto.getAmenities());

        return club;
    }

}
