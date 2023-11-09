package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.dto.NeighborhoodDTO;
import com.mesumo.msclubs.models.entities.Neighborhood;
import com.mesumo.msclubs.models.service.impl.NeighborhoodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/neighborhood")
@CrossOrigin
public class NeighborhoodController {

    private final NeighborhoodService service;

    public NeighborhoodController(NeighborhoodService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Neighborhood> getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<Neighborhood> response = null;

        response = new ResponseEntity<>(service.findById(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/")
    public ResponseEntity<Set<Neighborhood>> getAll() {
        ResponseEntity<Set<Neighborhood>> response = null;
        Set<Neighborhood> set = service.findAll();
        if (!set.isEmpty()) {
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
        Set<NeighborhoodDTO> list = service.findAllDTO();

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }


}
