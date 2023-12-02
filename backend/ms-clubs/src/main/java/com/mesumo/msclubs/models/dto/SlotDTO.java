package com.mesumo.msclubs.models.dto;

import com.mesumo.msclubs.models.entities.DayEntity;
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
public class SlotDTO {

    private Long id;

    private SlotCourtDTO court;

    private int capacity;

    private Set<DayEntity> days;

    private LocalTime startTime;

    private LocalTime endTime;

}
