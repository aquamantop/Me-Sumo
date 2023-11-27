package com.mesumo.msbookings.models.entities;

import com.mesumo.msbookings.models.dto.SlotDTO;
import com.mesumo.msbookings.models.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;


import java.sql.Time;
import java.sql.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long slotId;

    private Long activityId;

    private String activityName;

    private Long creatorId;

    private Long clubId;

    private String clubName;

    private String neighborhoodName;

    private Long courtId;

    private Date date;

    private Time startTime;

    private Time endTime;

    @ManyToMany
    @JoinTable(
        name = "booking_participant",
        joinColumns = @JoinColumn(name = "booking_id"),
        inverseJoinColumns = @JoinColumn(name = "participant_id"))
    private Set<Participant> participants;

    private String message;

    private boolean approved;

}
