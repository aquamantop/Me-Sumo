package com.mesumo.msbookings.models.service;

import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IBookingService {

    Booking findById(Long id) throws ResourceNotFoundException;
    Booking create(Booking booking);
    void deleteById(Long id) throws ResourceNotFoundException;
    Booking update(Booking booking) throws ResourceNotFoundException;

    Set<Booking> findAll();

    List<Booking> filterBooking(Specification spec);
    List<Booking> filterByDate(LocalDate startDate, LocalDate endDate);

    List<Booking> filterBySlotAndDate(Long slotId, LocalDate date, boolean approved);

}
