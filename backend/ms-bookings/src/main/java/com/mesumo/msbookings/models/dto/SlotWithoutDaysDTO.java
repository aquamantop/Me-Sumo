package com.mesumo.msbookings.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SlotWithoutDaysDTO {
    private Long id;
    private int capacity;


    private LocalTime startTime;

    private LocalTime endTime;
}
