package com.mesumo.msbookings.models.repository;

import com.mesumo.msbookings.models.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBookingRepository extends JpaRepository<Booking, Long> {
}
