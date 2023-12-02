package com.mesumo.msclubs.models.mappers;

import com.mesumo.msclubs.models.dto.SlotDTO;
import com.mesumo.msclubs.models.entities.Slot;
import org.modelmapper.ModelMapper;

public class SlotMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public SlotDTO convertToDto(Slot slot) {
        modelMapper.addConverter(new PersistentSetToSetConverter());
        return modelMapper.map(slot, SlotDTO.class);
    }

    public Slot convertToEntity(SlotDTO slotDTO) {
        return modelMapper.map(slotDTO, Slot.class);
    }

}
