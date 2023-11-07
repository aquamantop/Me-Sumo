package com.mesumo.msbookings.models.service.impl;

import com.mesumo.msbookings.models.dto.ActivityDTO;
import com.mesumo.msbookings.models.dto.ClubDTO;
import com.mesumo.msbookings.models.dto.SlotDTO;
import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.models.entities.Day;
import com.mesumo.msbookings.models.repository.feign.IClubFeignClient;
import com.mesumo.msbookings.models.service.IAvailabilityService;
import com.mesumo.msbookings.models.service.IBookingService;

import java.time.LocalDate;
import java.sql.Date;
import java.util.*;

public class AvailabilityService implements IAvailabilityService {

    IClubFeignClient clubFeignClient;
    IBookingService bookingService;
    @Override
    public Map<LocalDate, List<SlotDTO>> getAvailableBookings(Long clubId, String activityName) {
        ClubDTO club = clubFeignClient.getById(clubId);
        ActivityDTO selectedActivity = null;
        for (ActivityDTO activity : club.getActivities()) {
            if (activity.getName().equals(activityName)) {
                selectedActivity = activity;
                break;
            }
        }
        if (selectedActivity == null) {
            return null;
        }
        Set<SlotDTO> slots = selectedActivity.getSlots();

        Map<LocalDate, List<SlotDTO>> availabilityCalendar = new HashMap<>();
        LocalDate monthStart = LocalDate.now();
        LocalDate monthEnd = monthStart.plusDays(30);

        for (LocalDate date = monthStart; date.isBefore(monthEnd.plusDays(1)); date = date.plusDays(1)) {
            availabilityCalendar.put(date, new ArrayList<>());
        }

        for (SlotDTO slot : slots) {
            for (Day day : slot.getDays()) {
                LocalDate dateSlot = monthStart;
                while (dateSlot.getDayOfWeek() != day.toJavaDayOfWeek()) {
                    dateSlot = dateSlot.plusDays(1);
                }
                while (!dateSlot.isAfter(monthEnd)) {
                    availabilityCalendar.get(dateSlot).add(slot);
                    dateSlot = dateSlot.plusWeeks(1);
                }
            }

        }
        List<Booking> bookings = bookingService.filterByDate(Date.valueOf(monthStart), Date.valueOf(monthEnd));

        for (Booking booking : bookings) {
            Date bookingDate = (Date) booking.getDate();
            if (availabilityCalendar.containsKey(bookingDate.toLocalDate())){
                availabilityCalendar.get(bookingDate.toLocalDate()).remove(booking.getSlot());
            }
        }


        return availabilityCalendar;
    }
}
