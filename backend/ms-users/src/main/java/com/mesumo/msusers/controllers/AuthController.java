package com.mesumo.msusers.controllers;


import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.dto.UserAuthDTO;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    IUserService userService;


    @PostMapping("/login")
    public String login(UserAuthDTO userDTO) throws ResourceNotFoundException {
        User userExists = userService.findByEmail(userDTO.getEmail());

        return "welcome";

    }


}
