package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.SlotDTO;
import com.mesumo.msclubs.models.entities.Slot;
import com.mesumo.msclubs.models.mappers.SlotMapper;
import com.mesumo.msclubs.models.repository.ISlotRepository;
import com.mesumo.msclubs.models.service.ISlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SlotService implements ISlotService {

    private final ISlotRepository repository;

    private static final SlotMapper slotMapper = new SlotMapper();

    @Override
    public Slot findById(Long id) throws ResourceNotFoundException {
        Optional<Slot> slot = repository.findById(id);
        if(slot.isEmpty()){
            throw new ResourceNotFoundException("Slot not found");
        }
        return slot.get();
    }

    @Override
    public List<Slot> findAll() {
        return repository.findAll();
    }

    @Override
    public Slot create(Slot slot) {
        return repository.save(slot);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Slot> slot = repository.findById(id);
        if(slot.isEmpty()){
            throw new ResourceNotFoundException("Slot not found");
        }else {
            repository.deleteById(id);
            System.out.println("Slot delete with id: " + id);
        }
    }

    @Override
    public Slot update(Slot slot) throws ResourceNotFoundException {
        Optional<Slot> newSlot = repository.findById(slot.getId());
        if (newSlot.isPresent()){

            if (slot.getCourt() != null){
                newSlot.get().setCourt(slot.getCourt());
            }
            if (slot.getCapacity() != 0){
                newSlot.get().setCapacity(slot.getCapacity());
            }
            if (slot.getStartTime() != null){
                newSlot.get().setStartTime(slot.getStartTime());
            }
            if (slot.getEndTime() != null){
                newSlot.get().setEndTime(slot.getEndTime());
            }
            if (slot.getDays() != null){
                newSlot.get().setDays(slot.getDays());
            }
            repository.save(newSlot.get());
            return newSlot.get();
        } else {
            throw new ResourceNotFoundException("Slot not found");
        }
    }

    @Override
    public SlotDTO getSlotWithCourtById(Long id) throws ResourceNotFoundException {
        Optional<Slot> slot = repository.findById(id);

        if(slot.isEmpty()) throw new ResourceNotFoundException("Slot not found");

        return slotMapper.convertToDto(slot.get());

    }

}
