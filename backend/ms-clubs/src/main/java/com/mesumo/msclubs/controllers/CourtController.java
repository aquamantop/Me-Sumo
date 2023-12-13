package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.CourtDTO;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.service.ICourtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/court")
@RequiredArgsConstructor
public class CourtController {

    private final ICourtService courtService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        ResponseEntity<?> response;
        List<Court> courts = courtService.findAll();
        if(courts != null){
            response = ResponseEntity.ok(courts);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Court> getById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(courtService.findById(id));
    }

    @GetMapping("/club/{id}")
    public ResponseEntity<?> getByClubId(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response;
        List<CourtDTO> courts = courtService.findByClubId(id);
        if(courts != null){
            response = ResponseEntity.ok(courts);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @PostMapping("/add")
    public ResponseEntity<Court> add(@RequestBody Court court){
        ResponseEntity<Court> response;

        if(court != null){
            response = new ResponseEntity<>(courtService.create(court), HttpStatus.OK);
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @PutMapping("/update")
    public ResponseEntity<Court> update(@RequestBody Court court) throws ResourceNotFoundException {
        ResponseEntity<Court>response;

        if(court != null){
            response = new ResponseEntity<>(courtService.update(court), HttpStatus.OK);
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?>response;
        if(id != null){
            courtService.deleteById(id);
            response = ResponseEntity.ok().build();
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @GetMapping("/club-activity")
    public ResponseEntity<List<CourtDTO>> getByClubId(@RequestParam Long clubId, @RequestParam Long activityId ) throws ResourceNotFoundException {
        ResponseEntity<List<CourtDTO>> response;

        List<CourtDTO> courts = courtService.findByClubIdAndActivityId(clubId, activityId);
        if(courts != null){
            response = new ResponseEntity<>(courts, HttpStatus.OK);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }


}
