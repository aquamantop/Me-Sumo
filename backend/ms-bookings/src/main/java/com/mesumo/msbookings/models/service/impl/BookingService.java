package com.mesumo.msbookings.models.service.impl;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.models.repository.IBookingRepository;
import com.mesumo.msbookings.models.service.IBookingService;
import com.mesumo.msbookings.searchs.BookingSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class BookingService implements IBookingService {

    @Autowired
    IBookingRepository bookingRepository;

    @Override
    public Booking findById(Long id) throws ResourceNotFoundException {
        Optional<Booking> booking = bookingRepository.findById(id);
        if(booking.isEmpty()){
            throw new ResourceNotFoundException("Booking not found");
        }
        return booking.get();
    }

    @Override
    public Booking create(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Booking> booking = bookingRepository.findById(id);
        if(booking.isEmpty()){
            throw new ResourceNotFoundException("Booking not found");
        }else {
            bookingRepository.deleteById(id);
            System.out.println("Booking delete with id: " + id);
        }
    }

    @Override
    public Booking update(Booking booking) throws ResourceNotFoundException {
        Optional<Booking> newBooking = bookingRepository.findById(booking.getId());
        if (newBooking.isPresent()){

            if (booking.getName() != null){
                newBooking.get().setName(booking.getName());
            }
            if (booking.getSlotId() != null){
                newBooking.get().setSlotId(booking.getSlotId());
            }
            if (booking.getCreatorId() != null){
                newBooking.get().setCreatorId(booking.getCreatorId());
            }
            if (booking.getDate() != null){
                newBooking.get().setDate(booking.getDate());
            }
            if (booking.getStartTime() != null){
                newBooking.get().setStartTime(booking.getStartTime());
            }
            if (booking.getEndTime() != null){
                newBooking.get().setEndTime(booking.getEndTime());
            }
            if (booking.getParticipants() != 0){
                newBooking.get().setParticipants(booking.getParticipants());
            }
            if (booking.getMessage() != null){
                newBooking.get().setMessage(booking.getMessage());
            }
            if (!booking.isApproved()){
                newBooking.get().setApproved(true);
            }

            bookingRepository.save(newBooking.get());
        }else System.err.println("Booking not found with id: " + booking.getId());

        return newBooking.get();
    }

    @Override
    public Set<Booking> findAll() {
        List<Booking> bookings = bookingRepository.findAll();
        return new HashSet<>(bookings);
    }

    @Override
    public List<Booking> filterBooking(Specification spec) {
        List<Booking> listBookings = bookingRepository.findAll(spec);
        return listBookings;
    }

    @Override
    public List<Booking> filterByDate(LocalDate startDate, LocalDate endDate) {
        return null;
    }

    @Override
    public List<Booking> filterBySlotAndDate(Long slotId, LocalDate date, boolean approved) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsBySlotAndDate(slotId, date, approved));
        return filterBooking(spec);
    }

    public List<Booking> filterByApproved(boolean approved) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(approved));
        return filterBooking(spec);
    }

}
