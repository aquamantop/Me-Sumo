package com.mesumo.msbookings.models.service;

import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;
import java.util.List;

public interface IBookingService {

    Booking findById(Long id) throws ResourceNotFoundException;
    Booking create(Booking booking);
    
    void deleteById(Long id) throws ResourceNotFoundException;
    Booking update(Booking booking) throws ResourceNotFoundException;

    List<Booking> findAll();

    List<Booking> filterBooking(Specification spec);
    List<Booking> filterByDate(LocalDate startDate);

    List<Booking> filterBySlotAndDate(Long slotId, LocalDate date);

}
