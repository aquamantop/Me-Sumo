package com.mesumo.msusers.controllers;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.service.IActivityService;
import com.mesumo.msusers.models.service.impl.ActivityService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/activity")
@CrossOrigin
public class ActivityController {

    @Autowired
    IActivityService activityService;


    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) {
        ResponseEntity<Activity> response = null;
        try{
            response = new ResponseEntity<>(activityService.findById(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }


    @GetMapping("/search-name")
    public ResponseEntity<Activity> getByName(@RequestParam("name") String name) {
        ResponseEntity<Activity> response = null;
        try{
            response = new ResponseEntity<>(activityService.findByName(name), HttpStatus.OK);
        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @GetMapping("/")
    public ResponseEntity<Set<Activity>> getAll() {
        ResponseEntity<Set<Activity>> response = null;
        Set<Activity> set = activityService.findAll();
        if(set != null){
            response = new ResponseEntity<>(set, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Activity activity) throws ResourceAlreadyExistsException {
        ResponseEntity response = null;

        if(activity != null){
            response = new ResponseEntity(activityService.create(activity), HttpStatus.CREATED);
        }
        
        return response;
    }



}
