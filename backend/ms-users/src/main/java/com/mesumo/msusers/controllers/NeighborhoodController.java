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
    public ResponseEntity<Neighborhood> getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<Neighborhood> response = null;
//        try{
//            response = new ResponseEntity<>(neighborhoodService.findById(id), HttpStatus.OK);
//        } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        return new ResponseEntity<>(neighborhoodService.findById(id), HttpStatus.OK);
    }


    @GetMapping("/search-name")
    public ResponseEntity<Neighborhood> getByName(@RequestParam("name") String name) throws ResourceNotFoundException {
//        ResponseEntity<Neighborhood> response = null;
//        try{
//            response = new ResponseEntity<>(neighborhoodService.findByName(name), HttpStatus.OK);
//        } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        return new ResponseEntity<>(neighborhoodService.findByName(name), HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<Set<Neighborhood>> getAll() {
//        ResponseEntity<Set<Neighborhood>> response = null;
//        Set<Neighborhood> set = neighborhoodService.findAll();
//        if(set != null){
//            response = new ResponseEntity<>(set, HttpStatus.OK);
//        } else {
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        Set<Neighborhood> set = neighborhoodService.findAll();
        return new ResponseEntity<>(set, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Neighborhood neighborhood) throws ResourceAlreadyExistsException {
//        ResponseEntity response = null;
//
//        if(neighborhood != null){
//            response = new ResponseEntity(neighborhoodService.create(neighborhood), HttpStatus.CREATED);
//        }

        return new ResponseEntity(neighborhoodService.create(neighborhood), HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity update (@RequestBody Neighborhood neighborhood) throws ResourceNotFoundException {
//        ResponseEntity response = null;
//        if(club.getId() != null){
//            try {
//                response = new ResponseEntity(service.update(club), HttpStatus.OK);
//
//            } catch (ResourceNotFoundException e){
//                e.printStackTrace();
//            }
//        } else response = new ResponseEntity("Complete id field", HttpStatus.BAD_REQUEST);

        return new ResponseEntity(neighborhoodService.update(neighborhood), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete (@PathVariable Long id) throws ResourceNotFoundException {
//        ResponseEntity response = null;
//        try {
//            service.deleteById(id);
//            response = new ResponseEntity("Club deleted with id: " + id, HttpStatus.OK);
//        } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity("Club not found with id: " + id, HttpStatus.BAD_REQUEST);
//
        neighborhoodService.deleteById(id);
        return new ResponseEntity("Neighborhood deleted with id: " + id, HttpStatus.OK);
    }
}
