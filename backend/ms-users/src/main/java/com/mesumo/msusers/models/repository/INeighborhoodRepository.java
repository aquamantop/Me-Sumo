package com.mesumo.msusers.models.repository;

import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.entities.Neighborhood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface INeighborhoodRepository extends JpaRepository<Neighborhood, Long> {
    @Query(value = "select * from neighborhood where name = :name", nativeQuery = true)
    Neighborhood findByName (String name);
}
