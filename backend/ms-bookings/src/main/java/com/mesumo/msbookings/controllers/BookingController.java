package com.mesumo.msbookings.controllers;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.dto.CourtDTO;
import com.mesumo.msbookings.models.dto.SlotDTO;
import com.mesumo.msbookings.models.dto.SlotWithoutDaysDTO;
import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.models.service.impl.AvailabilityService;
import com.mesumo.msbookings.models.service.impl.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingService service;
    private final AvailabilityService availabilityService;

    public BookingController(BookingService service, AvailabilityService availabilityService) {
        this.service = service;
        this.availabilityService = availabilityService;
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) {
        ResponseEntity response = null;

        try{
            response = new ResponseEntity(service.findById(id), HttpStatus.OK);

        } catch (ResourceNotFoundException e){
            e.printStackTrace();
            response = new ResponseEntity("Booking not found with id: " + id, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @GetMapping("/")
    public ResponseEntity getAll() {
        ResponseEntity response = null;
        Set<Booking> list = service.findAll();

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

    @GetMapping("/filter")
    public ResponseEntity filterByDate(@RequestParam Long clubId, @RequestParam String activityName) {
        ResponseEntity response = null;
        Map<LocalDate, Map<CourtDTO, List<SlotWithoutDaysDTO>>> list = availabilityService.getAvailableBookings(clubId, activityName);

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }


    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Booking booking){
        ResponseEntity response = null;

        if(booking != null){
            response = new ResponseEntity(service.create(booking), HttpStatus.CREATED);
        } else response = new ResponseEntity("Complete the fields", HttpStatus.BAD_REQUEST);

        return response;
    }

    @PutMapping("/update")
    public ResponseEntity update (@RequestBody Booking booking){
        ResponseEntity response = null;

        if(booking != null){
            try {
                response = new ResponseEntity(service.update(booking), HttpStatus.OK);
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
                response = new ResponseEntity("Booking not found with id: " + booking.getId(), HttpStatus.NOT_FOUND);
            }
        } else response = new ResponseEntity("Complete the fields", HttpStatus.BAD_REQUEST);

        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete (@PathVariable Long id) {
        ResponseEntity response = null;

        try {
            service.deleteById(id);
            response = new ResponseEntity("Booking delete with id: " + id, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
            response = new ResponseEntity("Booking not found with id: " + id, HttpStatus.NOT_FOUND);
        }

        return response;
    }
}
