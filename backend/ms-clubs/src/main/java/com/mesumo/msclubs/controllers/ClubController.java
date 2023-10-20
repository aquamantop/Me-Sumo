package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ClubDTO;
import com.mesumo.msclubs.models.service.impl.ClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequestMapping("/club")
@CrossOrigin
public class ClubController {

    private final ClubService service;

    public ClubController(ClubService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) {
        ResponseEntity response = null;

        try{
            response = new ResponseEntity(service.findById(id), HttpStatus.OK);

        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity("Club not found with id: " + id, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @GetMapping("/")
    public ResponseEntity getAll() {
        ResponseEntity response = null;
        Set<ClubDTO> set = service.findAll();

        if(set != null){
            response = new ResponseEntity(set, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody ClubDTO dto){
        ResponseEntity response = null;

        if(dto != null){
            response = new ResponseEntity(service.create(dto), HttpStatus.CREATED);
        } else response = new ResponseEntity("Complete the fields", HttpStatus.BAD_REQUEST);

        return response;
    }

    @PutMapping("/update")
    public ResponseEntity update (@RequestBody ClubDTO dto){
        ResponseEntity response = null;

        if(dto.getId() != null){
            try {
                response = new ResponseEntity(service.update(dto), HttpStatus.OK);

            } catch (ResourceNotFoundException e){
                e.printStackTrace();
            }
        } else response = new ResponseEntity("Complete id field", HttpStatus.BAD_REQUEST);

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete (@PathVariable Long id) {
        ResponseEntity response = null;

        try {
            service.deleteById(id);
            response = new ResponseEntity("Club deleted with id: " + id, HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity("Club not found with id: " + id, HttpStatus.BAD_REQUEST);
        }

        return response;
    }


}
