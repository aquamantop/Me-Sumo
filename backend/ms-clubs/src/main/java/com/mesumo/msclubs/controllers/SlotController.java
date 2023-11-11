package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Slot;
import com.mesumo.msclubs.models.service.ISlotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/slot")
@CrossOrigin
public class SlotController {

    ISlotService slotService;

    public SlotController(ISlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping("/")
    public ResponseEntity getAll() {
        ResponseEntity response = null;
        List<Slot> slots = slotService.findAll();

        if(slots != null){
            response = ResponseEntity.ok(slots);
        } else {
            response = ResponseEntity.notFound().build();
        }

        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        Slot slot = slotService.findById(id);

        if(slot != null){
            response = ResponseEntity.ok(slot);
        } else {
            response = ResponseEntity.notFound().build();
        }

        return response;
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Slot slot){
        ResponseEntity response = null;
        if(slot != null){
            response = ResponseEntity.ok(slotService.create(slot));
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody Slot slot) throws ResourceNotFoundException {
        ResponseEntity response = null;
        if(slot != null){
            response = ResponseEntity.ok(slotService.update(slot));
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        if(id != null){
            slotService.deleteById(id);
            response = ResponseEntity.ok().build();
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }
}
