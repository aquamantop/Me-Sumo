package com.mesumo.msclubs.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.entities.Neighborhood;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClubDTO {

    private String name;
    private NeighborhoodDTO neighborhood;
    private Set<ActivityDTO> activities;

    public ClubDTO() {
    }
}
