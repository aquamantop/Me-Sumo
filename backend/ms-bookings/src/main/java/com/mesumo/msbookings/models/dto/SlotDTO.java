package com.mesumo.msbookings.models.dto;

import com.mesumo.msbookings.models.entities.Day;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SlotDTO {
    private Long id;
    private int capacity;

    private Set<Day> days;

    private Time startTime;

    private Time endTime;

}
