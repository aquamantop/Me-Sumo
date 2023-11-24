package com.mesumo.msclubs.models.dto;

import com.mesumo.msclubs.models.entities.CourtType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SlotCourtDTO {

    private Long id;

    private String name;

    private CourtClubDTO club;

    private CourtActivityDTO activity;

    private CourtType court_type;

    private boolean inside;

}
