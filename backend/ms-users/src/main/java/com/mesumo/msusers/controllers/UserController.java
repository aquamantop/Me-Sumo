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
    public ResponseEntity<User> getById(@PathVariable Long id) throws ResourceNotFoundException {
//        ResponseEntity<User> response = null;
//        try{
//            response = new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
//        } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }


    @GetMapping("/search-email")
    public ResponseEntity<User> getByEmail(@RequestParam("email") String email) throws ResourceNotFoundException {
//        ResponseEntity<User> response = null;
//        try{
//            response = new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
//        } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        return new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<Set<User>> getAll() {
//        ResponseEntity<Set<User>> response = null;
//        Set<User> set = userService.findAll();
//        if(set != null){
//            response = new ResponseEntity<>(set, HttpStatus.OK);
//        } else {
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        Set<User> set = userService.findAll();
        return new ResponseEntity<>(set, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity add(@RequestBody User user) throws ResourceAlreadyExistsException {
//        ResponseEntity response = null;
//        if(user != null){
//            response = new ResponseEntity(userService.create(user), HttpStatus.CREATED);
//        }
//        return response;
        return new ResponseEntity(userService.create(user), HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity update (@RequestBody User user) throws ResourceNotFoundException {
//        ResponseEntity response = null;
//        if(club.getId() != null){
//            try {
//                response = new ResponseEntity(service.update(club), HttpStatus.OK);
//
//            } catch (ResourceNotFoundException e){
//                e.printStackTrace();
//            }
//        } else response = new ResponseEntity("Complete id field", HttpStatus.BAD_REQUEST);

        return new ResponseEntity(userService.update(user), HttpStatus.OK);
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
        userService.deleteById(id);
        return new ResponseEntity("User deleted with id: " + id, HttpStatus.OK);
    }


}
