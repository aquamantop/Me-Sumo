package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findByName(String name);

}
