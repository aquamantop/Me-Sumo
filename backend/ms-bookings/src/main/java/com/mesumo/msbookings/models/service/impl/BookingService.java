package com.mesumo.msbookings.models.service.impl;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.dto.ActivityDTO;
import com.mesumo.msbookings.models.dto.FiltersDTO;
import com.mesumo.msbookings.models.dto.UserDTO;
import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.models.entities.Participant;
import com.mesumo.msbookings.models.repository.IBookingRepository;
import com.mesumo.msbookings.models.repository.feign.IClubFeignClient;
import com.mesumo.msbookings.models.repository.feign.IUserFeignClient;
import com.mesumo.msbookings.models.service.IBookingService;
import com.mesumo.msbookings.models.service.IParticipantService;
import com.mesumo.msbookings.searchs.BookingSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final IBookingRepository bookingRepository;

    private final IParticipantService participantService;

    @Qualifier("com.mesumo.msbookings.models.repository.feign.IUserFeignClient")
    private final IUserFeignClient userFeignClient;

    @Qualifier("com.mesumo.msbookings.models.repository.feign.IClubFeignClient")
    private final IClubFeignClient clubFeignClient;

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
        UserDTO creator = userFeignClient.getById(booking.getCreatorId());
        Participant firstParticipant = new Participant(booking.getCreatorId(), creator.getFirstName(), creator.getLastName(), creator.getEmail());
        booking.getParticipants().add(firstParticipant);
        participantService.create(firstParticipant);
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
            if (booking.getActivityId() != null){
                newBooking.get().setActivityId(booking.getActivityId());
            }
            if (booking.getActivityName() != null){
                newBooking.get().setActivityName(booking.getActivityName());
            }
            if (booking.getCreatorId() != null){
                newBooking.get().setCreatorId(booking.getCreatorId());
            }
            if (booking.getClubId() != null){
                newBooking.get().setClubId(booking.getClubId());
            }
            if (booking.getNeighborhoodName() != null){
                newBooking.get().setNeighborhoodName(booking.getNeighborhoodName());
            }
            if (booking.getCourtId() != null){
                newBooking.get().setCourtId(booking.getCourtId());
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
            if (booking.getParticipants() != newBooking.get().getParticipants()){
                newBooking.get().setParticipants(booking.getParticipants());
            }
            if (booking.getMessage() != null){
                newBooking.get().setMessage(booking.getMessage());
            }
            if (booking.getApproved() != newBooking.get().getApproved()){
                newBooking.get().setApproved(booking.getApproved());
            }

            bookingRepository.save(newBooking.get());
        }else System.err.println("Booking not found with id: " + booking.getId());

        return newBooking.get();
    }

    public Booking addParticipant(Long bookingId, Participant participant) throws ResourceNotFoundException {
        Booking booking = findById(bookingId);
        if(!booking.getParticipants().contains(participant) && !booking.getApproved()){
            participantService.create(participant);
            booking.getParticipants().add(participant);
            if (clubFeignClient.getSlotById(booking.getSlotId()).getCapacity() <= booking.getParticipants().size()){
                booking.setApproved(true);
            }
            return update(booking);
        }
        return booking;

    }

    public Booking deleteParticipant(Long participantId, Long bookingId) throws ResourceNotFoundException {
        Participant participant = participantService.findById(participantId);
        Booking booking = findById(bookingId);
        if (booking.getParticipants().contains(participant)){
            booking.getParticipants().remove(participant);
            participantService.deleteById(participantId);
            if (clubFeignClient.getSlotById(booking.getSlotId()).getCapacity() > booking.getParticipants().size()){
                booking.setApproved(false);
            }
            return update(booking);
        }

        return booking;
    }

    @Override
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> filterBooking(Specification spec) {
        List<Booking> listBookings = bookingRepository.findAll(spec);
        return listBookings;
    }

    @Override
    public List<Booking> filterByDate(LocalDate startDate) {
        return null;
    }

    @Override
    public List<Booking> filterBySlotAndDate(Long slotId, LocalDate date) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsBySlotAndDate(slotId, date));
        return filterBooking(spec);
    }


    public List<Booking> filterByApproved(boolean approved) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(approved));
        return filterBooking(spec);
    }

    public List<Booking> filterByClubAndApproved(Long clubId, boolean approved) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(approved));
        spec = spec.and(BookingSpecification.bookingsByClub(clubId));
        return filterBooking(spec);
    }

    public List<Booking> filterByCreatorUser(Long userId) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsByCreatorUser(userId));
        return filterBooking(spec);
    }

    public List<Booking> filterByUserParticipant(Long userId, boolean approved) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsByUserParticipant(userId));
        spec = spec.and(BookingSpecification.bookingsApproved(approved));
        spec = spec.and(BookingSpecification.bookingsWithinNext30Days());
        return filterBooking(spec);
    }

    public List<Booking> filterByClubAndUserParticipant(Long clubId, Long userId) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsByClub(clubId));
        spec = spec.and(BookingSpecification.bookingsByUserParticipant(userId));
        return filterBooking(spec);
    }

    public List<Booking> filterByClubAndCreatorUser(Long clubId, Long userId) {
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsByClub(clubId));
        spec = spec.and(BookingSpecification.bookingsByCreatorUser(userId));
        return filterBooking(spec);
    }

    public FiltersDTO filtersActivity(Long activityId) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        List<Booking> bookings = filterBooking(spec);
        return returnFilters(bookings, filters);
    }

    public FiltersDTO filtersActivityAndNeighborhood(Long activityId, String neighborhood) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));

        List<Booking> bookings = filterBooking(spec);
        return returnFilters(bookings, filters);
    }

    public FiltersDTO filtersActivityAndDate(Long activityId, LocalDate date) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        List<Booking> bookings = filterBooking(spec);

        return returnFilters(bookings, filters);
    }

    public FiltersDTO filtersNeighborhood(String neighborhood) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        List<Booking> bookings = filterBooking(spec);

        return returnFilters(bookings, filters);
    }

    public FiltersDTO filtersNeighborhoodAndDate(String neighborhood, LocalDate date) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        List<Booking> bookings = filterBooking(spec);

        return returnFilters(bookings, filters);
    }

    public FiltersDTO filtersDate(LocalDate date) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        List<Booking> bookings = filterBooking(spec);

        return returnFilters(bookings, filters);
    }

    public FiltersDTO filtersActivityAndNeighborhoodAndDate(Long activityId, String neighborhood, LocalDate date) {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        List<Booking> bookings = filterBooking(spec);

        return returnFilters(bookings, filters);
    }

    public FiltersDTO returnFilters (List<Booking> bookings, FiltersDTO filters) {
        filters.setNeighborhood(bookings.stream()
                .map(Booking::getNeighborhoodName)
                .collect(Collectors.toSet()));
        filters.setActivities(bookings.stream()
                .map(booking -> new ActivityDTO(booking.getActivityId(), booking.getActivityName()))
                .distinct()
                .collect(Collectors.toSet()));
        filters.setBookingDates(bookings.stream()
                .map(Booking ::getDate)
                .collect(Collectors.toSet()));

        return filters;
    }

    public List<Booking> filtersActivity(Long activityId, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        return filterBooking(spec);

    }
    public List<Booking> filtersActivityAndNeighborhood(Long activityId, String neighborhood, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        return filterBooking(spec);

    }
    public List<Booking> filtersActivityAndDate(Long activityId, LocalDate date, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        return filterBooking(spec);

    }
    public List<Booking> filtersNeighborhood(String neighborhood, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        return filterBooking(spec);

    }
    public List<Booking> filtersNeighborhoodAndDate(String neighborhood, LocalDate date, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        return filterBooking(spec);

    }
    public List<Booking> filtersDate(LocalDate date, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        return filterBooking(spec);

    }
    public List<Booking> filtersActivityAndNeighborhoodAndDate(Long activityId, String neighborhood, LocalDate date, boolean full) {

        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        spec = spec.and(BookingSpecification.bookingsByActivities(activityId));
        spec = spec.and(BookingSpecification.bookingsByNeighborhood(neighborhood));
        spec = spec.and(BookingSpecification.bookingsByDate(date));
        return filterBooking(spec);

    }


    public FiltersDTO initialFiltersValues() {
        FiltersDTO filters = new FiltersDTO();
        Specification<Booking> spec = new BookingSpecification();
        spec = spec.and(BookingSpecification.bookingsApproved(false));
        List<Booking> bookings = filterBooking(spec);
        return returnFilters(bookings, filters);
    }
}
