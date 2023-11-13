package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ICourtRepository extends JpaRepository<Court, Long> {

    List<Court> findByClubIdAndActivityId(Long clubId, Long activityId);

    //@Query(value = "select c.name from court c where c.club_id = :clubId and c.activity_id = :activityId limit 1", nativeQuery = true)
    //Court findByClubAndActivity (Long clubId, Long activityId);

    //@Query(value = "select c.name from court c where c.club_id = :clubId and c.activity_id = :activityId limit 1", nativeQuery = true)
    //Court findByClubId (@Param("clubId")  Long clubId, @Param("activityId") Long activityId);

    //@Query(value = "select name from court where club_id = :clubId limit 1", nativeQuery = true)
    //ourt findByClubId2 (Long clubId);

    //List<Court> findByClubActivityId(Long clubId);
}
