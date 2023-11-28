package com.mesumo.msusers.controllers;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final IUserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/search-email")
    public ResponseEntity<User> getByEmail(@RequestParam String email) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Set<User>> getAll() {
        Set<User> set = userService.findAll();
        return new ResponseEntity<>(set, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody User user) throws ResourceAlreadyExistsException {
        return new ResponseEntity(userService.create(user), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity update (@RequestBody User user) throws ResourceNotFoundException {
        return new ResponseEntity(userService.update(user), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete (@PathVariable Long id) throws ResourceNotFoundException {
        userService.deleteById(id);
        return new ResponseEntity("User deleted with id: " + id, HttpStatus.OK);
    }


}
