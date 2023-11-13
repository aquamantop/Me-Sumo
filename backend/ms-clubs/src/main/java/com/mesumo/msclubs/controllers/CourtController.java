package com.mesumo.msclubs.controllers;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.service.ICourtService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/court")
@CrossOrigin
public class CourtController {
    ICourtService courtService;

    public CourtController(ICourtService courtService) {
        this.courtService = courtService;
    }

    @GetMapping("/")
    public ResponseEntity getAll() {
        ResponseEntity response = null;
        List<Court> courts = courtService.findAll();
        if(courts != null){
            response = ResponseEntity.ok(courts);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        Court court = courtService.findById(id);
        if(court != null){
            response = ResponseEntity.ok(court);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Court court){
        ResponseEntity response = null;
        if(court != null){
            response = ResponseEntity.ok(courtService.create(court));
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody Court court) throws ResourceNotFoundException {
        ResponseEntity response = null;
        if(court != null){
            response = ResponseEntity.ok(courtService.update(court));
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        if(id != null){
            courtService.deleteById(id);
            response = ResponseEntity.ok().build();
        } else {
            response = ResponseEntity.badRequest().build();
        }
        return response;
    }


    @GetMapping("/club")
    public ResponseEntity getByClubId(@RequestParam Long clubId, @RequestParam Long activityId ) throws ResourceNotFoundException {
        ResponseEntity response = null;
        //System.out.println(court.getClub().getId());
        //System.out.println(court.getActivity().getId());

        //Court courtExists = courtService.findByClubId(court.getClub().getId(),court.getActivity().getId());
        List<Court> courts = courtService.findByClubIdAndActivityId(clubId, activityId);
        if(courts != null){
            response = ResponseEntity.ok(courts);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    /*
    @GetMapping("/club/{id}")
    public ResponseEntity getByClubId(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        //System.out.println(court.getClub().getId());
        //System.out.println(court.getActivity().getId());

        Court courtExists = courtService.findByClubId2(id);
        if(courtExists != null){
            response = ResponseEntity.ok(courtExists);
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }*/
}
