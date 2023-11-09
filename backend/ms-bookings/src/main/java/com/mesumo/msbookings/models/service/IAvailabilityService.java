package com.mesumo.msbookings.models.service;

import com.mesumo.msbookings.models.dto.CourtDTO;
import com.mesumo.msbookings.models.dto.SlotWithoutDaysDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface IAvailabilityService {

    Map<LocalDate, Map<CourtDTO, List<SlotWithoutDaysDTO>>> getAvailableBookings(Long clubId, String activityName);
}
