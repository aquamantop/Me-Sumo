package com.mesumo.msclubs.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
public class CourtClubDTO {

    private String name;

    private NeighborhoodDTO neighborhood;

    private String address;

    private String Url;

}
