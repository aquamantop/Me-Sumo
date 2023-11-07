package com.mesumo.msbookings.models.service;

import com.mesumo.msbookings.models.dto.SlotDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface IAvailabilityService {

    Map<LocalDate, List<SlotDTO>> getAvailableBookings(Long clubId, String activityName);
}
