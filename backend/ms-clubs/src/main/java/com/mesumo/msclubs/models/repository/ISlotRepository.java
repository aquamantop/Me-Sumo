package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISlotRepository extends JpaRepository<Slot, Long> {
}
