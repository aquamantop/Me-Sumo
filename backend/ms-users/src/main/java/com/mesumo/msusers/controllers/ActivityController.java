package com.mesumo.msusers.controllers;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.service.IActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/user-activity")
public class ActivityController {

    @Autowired
    IActivityService activityService;


    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) throws ResourceNotFoundException {
//        ResponseEntity<Activity> response = null;
//        try{
//            response = new ResponseEntity<>(activityService.findById(id), HttpStatus.OK);
//       } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        return new ResponseEntity<>(activityService.findById(id), HttpStatus.OK);
    }


    @GetMapping("/search-name")
    public ResponseEntity<Activity> getByName(@RequestParam("name") String name) throws ResourceNotFoundException {
//        ResponseEntity<Activity> response = null;
//        try{
//            response = new ResponseEntity<>(activityService.findByName(name), HttpStatus.OK);
//        } catch (ResourceNotFoundException e){
//            e.printStackTrace();
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        return new ResponseEntity<>(activityService.findByName(name), HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<Set<Activity>> getAll() {
//        ResponseEntity<Set<Activity>> response = null;
//        Set<Activity> set = activityService.findAll();
//        if(set != null){
//            response = new ResponseEntity<>(set, HttpStatus.OK);
//        } else {
//            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//        return response;
        Set<Activity> set = activityService.findAll();
        return new ResponseEntity<>(set, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Activity activity) throws ResourceAlreadyExistsException {
//        ResponseEntity response = null;
//        if(activity != null){
//            response = new ResponseEntity(activityService.create(activity), HttpStatus.CREATED);
//        }
//        return response;
        return new ResponseEntity(activityService.create(activity), HttpStatus.CREATED);
    }



    @PutMapping("/update")
    public ResponseEntity update (@RequestBody Activity activity) throws ResourceNotFoundException {
//        ResponseEntity response = null;
//        if(club.getId() != null){
//            try {
//                response = new ResponseEntity(service.update(club), HttpStatus.OK);
//
//            } catch (ResourceNotFoundException e){
//                e.printStackTrace();
//            }
//        } else response = new ResponseEntity("Complete id field", HttpStatus.BAD_REQUEST);

        return new ResponseEntity(activityService.update(activity), HttpStatus.OK);
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
        activityService.deleteById(id);
        return new ResponseEntity("Activity deleted with id: " + id, HttpStatus.OK);
    }



}
