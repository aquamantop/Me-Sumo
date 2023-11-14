package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ICourtRepository extends JpaRepository<Court, Long> {

    List<Court> findByClubIdAndActivityId(Long clubId, Long activityId);

}
