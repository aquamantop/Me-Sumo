package com.mesumo.msclubs.models.repository;

import com.mesumo.msclubs.models.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IActivityRepository extends JpaRepository<Activity, Long> {
}
