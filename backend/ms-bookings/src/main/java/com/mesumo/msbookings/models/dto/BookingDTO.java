package com.mesumo.msbookings.models.dto;

import com.mesumo.msbookings.models.entities.Participant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingDTO {

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

    private Set<Participant> participants;

    private String message;

    private boolean approved;

    Set<UserDTO> group;
}
