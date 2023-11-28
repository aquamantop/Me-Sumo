package com.mesumo.msbookings.controllers;

import com.mesumo.msbookings.exceptions.ResourceNotFoundException;
import com.mesumo.msbookings.models.dto.CourtDTO;
import com.mesumo.msbookings.models.dto.SlotWithoutDaysDTO;
import com.mesumo.msbookings.models.entities.Booking;
import com.mesumo.msbookings.models.entities.Participant;
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

    @GetMapping("/approved")
    public ResponseEntity filterByApproved(@RequestParam boolean approved) {
        ResponseEntity response = null;
        List<Booking> list = service.filterByApproved(approved);

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

    @GetMapping("/approved/{id}")
    public ResponseEntity filterByClubAndApproved(@PathVariable Long id, @RequestParam boolean approved) {
        ResponseEntity response = null;
        List<Booking> list = service.filterByClubAndApproved(id, approved);

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty list", HttpStatus.NOT_FOUND);

        return response;
    }

    @GetMapping("/club_activity")
    public ResponseEntity filterByClubAndActivity(@RequestParam Long clubId, @RequestParam Long activityId) {
        ResponseEntity response = null;
        Map<LocalDate, Map<CourtDTO, List<SlotWithoutDaysDTO>>> list = availabilityService.getAvailableBookings(clubId, activityId);

        if(list != null){
            response = new ResponseEntity(list, HttpStatus.OK);
        } else response = new ResponseEntity("Empty map", HttpStatus.NOT_FOUND);

        return response;
    }

    @GetMapping("filter_endpoint")
    public ResponseEntity filterByActivityNeighborhoodAndDates(@RequestParam(required = false) Long activityId, @RequestParam(required = false) String neighborhood, @RequestParam(required = false) String date, @RequestParam(required = false) Boolean full) {
        ResponseEntity response = null;
        if(activityId == null){
            activityId = 0L;
        }
        if(neighborhood == null){
            neighborhood = "";
        }
        if(date == null){
            date = "";
        }
        if(full == null){
            full = false;
        }

        switch (String.valueOf(activityId)){
            case "0":
                switch (neighborhood){
                    case "":
                        switch (date){
                            case "":
                                response = new ResponseEntity(service.initialFiltersValues(), HttpStatus.OK);
                                break;
                            default:
                                if(!full)
                                    response = new ResponseEntity(service.filtersDate(LocalDate.parse(date)), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersDate(LocalDate.parse(date), true), HttpStatus.OK);

                                break;
                        }
                        break;
                    default:
                        switch (date){
                            case "":
                                if(!full)
                                    response = new ResponseEntity(service.filtersNeighborhood(neighborhood), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersNeighborhood(neighborhood, true), HttpStatus.OK);

                                break;
                            default:
                                if(!full)
                                    response = new ResponseEntity(service.filtersNeighborhoodAndDate(neighborhood, LocalDate.parse(date)), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersNeighborhoodAndDate(neighborhood, LocalDate.parse(date), true), HttpStatus.OK);

                                break;
                        }
                        break;
                }
                break;
            default:
                switch (neighborhood){
                    case "":
                        switch (date){
                            case "":
                                if(!full)
                                    response = new ResponseEntity(service.filtersActivity(activityId), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersActivity(activityId, true), HttpStatus.OK);

                                break;
                            default:
                                if(!full)
                                    response = new ResponseEntity(service.filtersActivityAndDate(activityId, LocalDate.parse(date)), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersActivityAndDate(activityId, LocalDate.parse(date), true), HttpStatus.OK);

                                break;
                        }
                        break;
                    default:
                        switch (date){
                            case "":
                                if(!full)
                                    response = new ResponseEntity(service.filtersActivityAndNeighborhood(activityId, neighborhood), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersActivityAndNeighborhood(activityId, neighborhood, true), HttpStatus.OK);

                                break;
                            default:
                                if (!full)
                                    response = new ResponseEntity(service.filtersActivityAndNeighborhoodAndDate(activityId, neighborhood, LocalDate.parse(date)), HttpStatus.OK);
                                else
                                    response = new ResponseEntity(service.filtersActivityAndNeighborhoodAndDate(activityId, neighborhood, LocalDate.parse(date), true), HttpStatus.OK);
                                break;
                        }
                        break;
                }
                break;

        }

        return response;
    }

    @GetMapping("/court_slots")
    public ResponseEntity filterByCourtAndSlots(@RequestParam Long clubId, @RequestParam Long courtId, @RequestParam Long activityId) {
        ResponseEntity response = null;
        Map<CourtDTO, Map<LocalDate,List<SlotWithoutDaysDTO>>> map = availabilityService.getAvailableBookingsByCourt(clubId, courtId, activityId);

        if(map != null){
            response = new ResponseEntity(map, HttpStatus.OK);
        } else response = new ResponseEntity("Empty map", HttpStatus.NOT_FOUND);

        return response;
    }

    @GetMapping("/participant_bookings")
    public ResponseEntity getParticipantsByBookingId(@RequestParam Long userId, @RequestParam boolean approved) {
        ResponseEntity response = null;
        List<Booking> list = service.filterByUserParticipant(userId, approved);

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
