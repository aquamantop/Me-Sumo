package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Amenity;
import com.mesumo.msclubs.models.service.impl.AmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/amenity")
public class AmenityController {

    private final AmenityService service;

    @GetMapping("/{id}")
    public ResponseEntity<Amenity> getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<Amenity> response;

        response = new ResponseEntity<>(service.findById(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        ResponseEntity<?> response;
        List<Amenity> list = service.findAll();

        if(list != null){
            response = new ResponseEntity<>(list, HttpStatus.OK);
        } else response = new ResponseEntity<>("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

}
