package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.service.impl.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {
    private final ActivityService service;

    public ActivityController(ActivityService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<Activity> response;

        response = new ResponseEntity<>(service.findById(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/")
    public ResponseEntity<List<Activity>> getAll() {
        ResponseEntity<List<Activity>> response;
        List<Activity> list = service.findAll();

        if(list != null){
            response = new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @GetMapping("/DTO/{id}")
    public ResponseEntity<ActivityDTO> getByIdDTO(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<ActivityDTO> response;

        response = new ResponseEntity<>(service.findByIdDTO(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/listDTO")
    public ResponseEntity<?> getAllDTO() {
        ResponseEntity<?> response;
        List<ActivityDTO> list = service.findAllDTO();

        if(list != null){
            response = new ResponseEntity<>(list, HttpStatus.OK);
        } else response = new ResponseEntity<>("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }


}
