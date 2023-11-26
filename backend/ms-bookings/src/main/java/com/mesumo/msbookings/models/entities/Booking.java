package com.mesumo.msbookings.models.entities;


import jakarta.persistence.*;
import lombok.*;
import java.sql.Time;
import java.sql.Date;

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

    private Long creatorId;

    private Date date;

    private Time startTime;

    private Time endTime;

    private int participants;

    private String message;

    private boolean approved;

}
