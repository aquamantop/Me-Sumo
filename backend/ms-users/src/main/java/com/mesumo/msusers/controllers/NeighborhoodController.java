package com.mesumo.msusers.controllers;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Neighborhood;
import com.mesumo.msusers.models.service.INeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/neighborhood")
@CrossOrigin
public class NeighborhoodController {

    @Autowired
    INeighborhoodService neighborhoodService;


    @GetMapping("/{id}")
    public ResponseEntity<Neighborhood> getById(@PathVariable Long id) {
        ResponseEntity<Neighborhood> response = null;
        try{
            response = new ResponseEntity<>(neighborhoodService.findById(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @GetMapping("/search-name")
    public ResponseEntity<Neighborhood> getByName(@RequestParam("name") String name) {
        ResponseEntity<Neighborhood> response = null;
        try{
            response = new ResponseEntity<>(neighborhoodService.findByName(name), HttpStatus.OK);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @GetMapping("/")
    public ResponseEntity<Set<Neighborhood>> getAll() {
        ResponseEntity<Set<Neighborhood>> response = null;
        Set<Neighborhood> set = neighborhoodService.findAll();
        if(set != null){
            response = new ResponseEntity<>(set, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Neighborhood neighborhood) throws ResourceAlreadyExistsException {
        ResponseEntity response = null;

        if(neighborhood != null){
            response = new ResponseEntity(neighborhoodService.create(neighborhood), HttpStatus.CREATED);
        }

        return response;
    }
}
