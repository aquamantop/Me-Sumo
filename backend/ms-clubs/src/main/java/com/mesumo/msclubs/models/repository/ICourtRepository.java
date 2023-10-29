package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Court;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICourtRepository extends JpaRepository<Court, Long> {
}
