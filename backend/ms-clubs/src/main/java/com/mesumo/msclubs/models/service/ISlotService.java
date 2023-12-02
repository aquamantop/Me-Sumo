package com.mesumo.msclubs.models.service;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.SlotDTO;
import com.mesumo.msclubs.models.entities.Slot;

public interface ISlotService extends ICRUDService<Slot> {

    SlotDTO getSlotWithCourtById(Long id) throws ResourceNotFoundException;

}
