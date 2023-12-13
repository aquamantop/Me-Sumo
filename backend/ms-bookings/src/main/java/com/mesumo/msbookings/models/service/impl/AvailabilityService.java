package com.mesumo.msbookings.models.service.impl;

import com.mesumo.msbookings.models.dto.*;
import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.models.entities.DayEntity;
import com.mesumo.msbookings.models.repository.feign.IClubFeignClient;
import com.mesumo.msbookings.models.service.IAvailabilityService;
import com.mesumo.msbookings.models.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class AvailabilityService implements IAvailabilityService {

    @Qualifier("com.mesumo.msbookings.models.repository.feign.IClubFeignClient")
    @Autowired
    IClubFeignClient clubFeignClient;

    @Autowired
    IBookingService bookingService;

    @Override
    public Map<LocalDate, Map<CourtDTO, List<SlotWithoutDaysDTO>>> getAvailableBookings(Long clubId, Long activityId) {

        ClubDTO club = clubFeignClient.getById(clubId);

        ActivityDTO selectedActivity = null;
        for (ActivityDTO activity : club.getActivities()) {
            if (activity.getId().equals(activityId)) {
                selectedActivity = activity;
                break;
            }
        }
        if (selectedActivity == null) {
            return null;
        }
        Map<LocalDate, Map<CourtDTO, List<SlotWithoutDaysDTO>>> availabilityCalendar = new HashMap<>();
        LocalDate monthStart = LocalDate.now();
        LocalDate monthEnd = monthStart.plusDays(30);

        for (CourtDTO court : selectedActivity.getCourts()) {

            Set<SlotDTO> slots = court.getSlots();

            for (SlotDTO slot : slots) {
                SlotWithoutDaysDTO slotWithoutDays = new SlotWithoutDaysDTO();
                slotWithoutDays.setId(slot.getId());
                slotWithoutDays.setCapacity(slot.getCapacity());
                slotWithoutDays.setStartTime(slot.getStartTime());
                slotWithoutDays.setEndTime(slot.getEndTime());

                for (DayEntity day : slot.getDays()) {
                    LocalDate dateSlot = monthStart;
                    List<Booking> bookings = bookingService.filterBySlotAndDate(slot.getId(), dateSlot);

                    while (dateSlot.getDayOfWeek() != day.toJavaDayOfWeek()) {
                        dateSlot = dateSlot.plusDays(1);
                    }
                    while (!dateSlot.isAfter(monthEnd)) {
                        if (!availabilityCalendar.containsKey(dateSlot)) {
                            availabilityCalendar.put(dateSlot, new HashMap<>());
                        }

//                        if (bookings.isEmpty()) {
//                            availabilityCalendar.computeIfAbsent(dateSlot, k -> new HashMap<>())
//                                    .computeIfAbsent(court, k -> new ArrayList<>())
//                                    .add(slotWithoutDays);
//                        }

                        dateSlot = dateSlot.plusWeeks(1);
                        bookings = bookingService.filterBySlotAndDate(slot.getId(), dateSlot);
                    }
                    bookings = null;
                }
            }
        }

        return availabilityCalendar;
    }

    public Map<CourtDTO, Map<LocalDate, List<SlotWithoutDaysDTO>>> getAvailableBookingsByCourt(Long clubId, Long courtId, Long activityId) {

        ClubDTO club = clubFeignClient.getById(clubId);

        ActivityDTO selectedActivity = null;
        for (ActivityDTO activity : club.getActivities()) {
            if (activity.getId().equals(activityId)) {
                selectedActivity = activity;
                break;
            }
        }
        if (selectedActivity == null) {
            return null;
        }
        Map<CourtDTO, Map<LocalDate,List<SlotWithoutDaysDTO>>> availabilityCalendar = new HashMap<>();
        CourtDTO selectedCourt = null;
        Set<SlotDTO> slots = null;
        LocalDate monthStart = LocalDate.now();
        LocalDate monthEnd = monthStart.plusDays(30);

        for (CourtDTO court : selectedActivity.getCourts()) {

            if (court.getId().equals(courtId)) {
                selectedCourt = court;
                slots = court.getSlots();
            }
        }

        if (selectedCourt == null) {
            return null;
        }
        if (slots == null) {
            return null;
        }
        for (SlotDTO slot : slots) {
            SlotWithoutDaysDTO slotWithoutDays = new SlotWithoutDaysDTO();
            slotWithoutDays.setId(slot.getId());
            slotWithoutDays.setCapacity(slot.getCapacity());
            slotWithoutDays.setStartTime(slot.getStartTime());
            slotWithoutDays.setEndTime(slot.getEndTime());

            for (DayEntity day : slot.getDays()) {
                LocalDate dateSlot = monthStart;
                List<Booking> bookings = bookingService.filterBySlotAndDate(slot.getId(), dateSlot);

                while (dateSlot.getDayOfWeek() != day.toJavaDayOfWeek()) {
                    dateSlot = dateSlot.plusDays(1);
                }
                while (!dateSlot.isAfter(monthEnd)) {
                     if (!availabilityCalendar.containsKey(selectedCourt)) {
                            availabilityCalendar.put(selectedCourt, new HashMap<>());
                     }
                     if (!availabilityCalendar.get(selectedCourt).containsKey(dateSlot)) {
                         availabilityCalendar.get(selectedCourt).put(dateSlot, new ArrayList<>());
                     }

                     bookings = null;
                     bookings = bookingService.filterBySlotAndDate(slot.getId(), dateSlot);

                    if (bookings.isEmpty()) {
                        availabilityCalendar.computeIfAbsent(selectedCourt, k -> new HashMap<>())
                                .computeIfAbsent(dateSlot, k -> new ArrayList<>())
                                .add(slotWithoutDays);
                    }

                    dateSlot = dateSlot.plusWeeks(1);

                }

            }
        }

        return availabilityCalendar;
    }


}
