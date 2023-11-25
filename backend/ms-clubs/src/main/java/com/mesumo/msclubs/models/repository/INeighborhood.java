package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Neighborhood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INeighborhood extends JpaRepository<Neighborhood, Long> {
}
