package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClubRepository extends JpaRepository<Club, Long> {
}
