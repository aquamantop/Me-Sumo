package com.mesumo.msbookings.models.repository;

import com.mesumo.msbookings.models.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findByUserId(Long userId);

}
