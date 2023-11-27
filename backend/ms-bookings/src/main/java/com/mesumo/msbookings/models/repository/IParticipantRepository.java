package com.mesumo.msbookings.models.repository;

import com.mesumo.msbookings.models.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IParticipantRepository extends JpaRepository<Participant, Long> {
}
