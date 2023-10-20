package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAmenityRepository extends JpaRepository<Amenity, Long> {
}
