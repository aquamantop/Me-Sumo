package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.CourtDTO;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.service.ICourtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/court")
public class CourtController {
    ICourtService courtService;

    public CourtController(ICourtService courtService) {
        this.courtService = courtService;
    }

    @GetMapping("/")
    public ResponseEntity getAll() {
        ResponseEntity response = null;
        List<Court> courts = courtService.findAll();
        if(courts != null){
            response = ResponseEntity.ok(courts);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        Court court = courtService.findById(id);
        if(court != null){
            response = ResponseEntity.ok(court);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Court court){
        ResponseEntity response = null;
        if(court != null){
            response = ResponseEntity.ok(courtService.create(court));
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody Court court) throws ResourceNotFoundException {
        ResponseEntity response = null;
        if(court != null){
            response = ResponseEntity.ok(courtService.update(court));
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        if(id != null){
            courtService.deleteById(id);
            response = ResponseEntity.ok().build();
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @GetMapping("/club-activity")
    public ResponseEntity getByClubId(@RequestParam Long clubId, @RequestParam Long activityId ) throws ResourceNotFoundException {
        ResponseEntity response = null;

        List<CourtDTO> courts = courtService.findByClubIdAndActivityId(clubId, activityId);
        if(courts != null){
            response = ResponseEntity.ok(courts);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }
}
