package com.mesumo.msusers.models.repository;

import com.mesumo.msusers.models.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IActivityRepository extends JpaRepository<Activity, Long> {

    @Query(value = "select * from activity where name = :name", nativeQuery = true)
    Activity findByName (String name);

}
