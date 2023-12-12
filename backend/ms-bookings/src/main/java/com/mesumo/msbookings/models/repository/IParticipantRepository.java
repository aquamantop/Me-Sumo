package com.mesumo.msbookings.models.repository;

import com.mesumo.msbookings.models.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface IParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByUserId(Long userId);

}
