package com.mesumo.msusers.controllers;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    IUserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        ResponseEntity<User> response = null;
        try{
            response = new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @GetMapping("/search-email")
    public ResponseEntity<User> getByEmail(@RequestParam("email") String email) {
        ResponseEntity<User> response = null;
        try{
            response = new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @GetMapping("/")
    public ResponseEntity<Set<User>> getAll() {
        ResponseEntity<Set<User>> response = null;
        Set<User> set = userService.findAll();
        if(set != null){
            response = new ResponseEntity<>(set, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @PostMapping("/add")
    public ResponseEntity add(@RequestBody User user) throws ResourceAlreadyExistsException {
        ResponseEntity response = null;

        if(user != null){
            response = new ResponseEntity(userService.create(user), HttpStatus.CREATED);
        }

        return response;
    }
}
