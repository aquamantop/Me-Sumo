package com.mesumo.msclubs.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    private String Url;

    public ClubDTO() {
    }
}
