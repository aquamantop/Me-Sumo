package com.mesumo.msbookings.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mesumo.msbookings.models.entities.DayEntity;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class SlotDTO {
    private Long id;
    private int capacity;

    private Set<DayEntity> days;

    private Time startTime;

    private Time endTime;

}
