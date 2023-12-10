package com.mesumo.msusers.controllers;

import com.mesumo.msusers.exceptions.PasswordException;
import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.entities.dto.UserChangePassword;
import com.mesumo.msusers.models.entities.dto.UserDTO;
import com.mesumo.msusers.models.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final IUserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/search-email")
    public ResponseEntity<UserDTO> getByEmail(@RequestParam String email) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> getAll() {
        List<UserDTO> list = userService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> add(@RequestBody User user) throws ResourceAlreadyExistsException {
        return new ResponseEntity<>(userService.create(user), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> update (@RequestBody User user) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword (@RequestBody UserChangePassword user) throws ResourceNotFoundException, PasswordException {
        return new ResponseEntity<>(userService.changePassword(user), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete (@PathVariable Long id) throws ResourceNotFoundException {
        userService.deleteById(id);
        return new ResponseEntity<>("User deleted with id: " + id, HttpStatus.OK);
    }

}
