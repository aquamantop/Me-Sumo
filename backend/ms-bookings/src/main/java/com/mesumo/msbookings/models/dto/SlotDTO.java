package com.mesumo.msbookings.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mesumo.msbookings.models.entities.DayEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SlotDTO {
    private Long id;
    private int capacity;

    private Set<DayEntity> days;

    private LocalTime startTime;

    private LocalTime endTime;

}
