package com.mesumo.msclubs.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mesumo.msclubs.models.entities.CourtType;
import com.mesumo.msclubs.models.entities.Slot;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
public class CourtDTO {

    private String name;

    private CourtClubDTO club;

    private CourtActivityDTO activity;

    private CourtType court_type;

    private boolean inside;

    private Set<Slot> slots;

}
