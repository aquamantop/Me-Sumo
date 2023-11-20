package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.entities.Club;
import com.mesumo.msclubs.models.service.impl.ClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/club")
public class ClubController {

    private final ClubService service;

    public ClubController(ClubService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> getById(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;

        response = new ResponseEntity(service.findById(id), HttpStatus.OK);

        return response;
    }

    @GetMapping("/")
    public ResponseEntity getAll() {
        ResponseEntity response = null;
        List<Club> list = service.findAll();

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Club club){
        ResponseEntity response = null;

        if(club != null){
            response = new ResponseEntity(service.create(club), HttpStatus.CREATED);
        } else response = new ResponseEntity("Complete the fields", HttpStatus.BAD_REQUEST);

        return response;
    }

    @PutMapping("/update")
    public ResponseEntity update (@RequestBody Club club) throws ResourceNotFoundException {
        ResponseEntity response = null;

        if(club.getId() != null){
            response = new ResponseEntity(service.update(club), HttpStatus.OK);
        } else response = new ResponseEntity("Complete id field", HttpStatus.BAD_REQUEST);

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete (@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;

        service.deleteById(id);
        response = new ResponseEntity("Club deleted with id: " + id, HttpStatus.OK);

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
        List<ClubDTO> list = service.findAllDTO();

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

}
