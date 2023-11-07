package com.mesumo.msbookings.models.entities;

import com.mesumo.msbookings.models.dto.SlotDTO;
import com.mesumo.msbookings.models.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Time;
import java.sql.Date;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    private Long id;
    private String name;

    private SlotDTO slot;

    private UserDTO creator;

    private Date date;

    private Time startTime;

    private Time endTime;

    private int participants;

    private String message;

    private boolean approved;

    Set<UserDTO> group;

}
