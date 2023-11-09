package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.service.impl.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/activity")
@CrossOrigin
public class ActivityController {
    private final ActivityService service;

    public ActivityController(ActivityService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<Activity> response = null;

        response = new ResponseEntity<>(service.findById(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/")
    public ResponseEntity<Set<Activity>> getAll() {
        ResponseEntity<Set<Activity>> response = null;
        Set<Activity> set = service.findAll();

        if(set != null){
            response = new ResponseEntity<>(set, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @GetMapping("/DTO/{id}")
    public ResponseEntity getByIdDTO(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;

        response = new ResponseEntity(service.findByIdDTO(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/listDTO")
    public ResponseEntity getAllDTO() {
        ResponseEntity response = null;
        Set<ActivityDTO> list = service.findAllDTO();

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }


}
