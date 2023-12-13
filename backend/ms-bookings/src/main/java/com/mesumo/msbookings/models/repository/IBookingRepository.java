package com.mesumo.msbookings.models.repository;

import com.mesumo.msbookings.models.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long>, JpaSpecificationExecutor<Booking> {
}
