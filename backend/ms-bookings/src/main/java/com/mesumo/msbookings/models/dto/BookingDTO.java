package com.mesumo.msbookings.models.dto;

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

    private Long creatorId;

    private Date date;

    private Time startTime;

    private Time endTime;

    private int participants;

    private String message;

    private boolean approved;

    Set<UserDTO> group;
}
