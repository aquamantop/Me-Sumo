package com.mesumo.msclubs.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.entities.Amenity;
import com.mesumo.msclubs.models.entities.Neighborhood;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClubDTO {
    private Long id;
    /*@Schema(required = true)
    @NotBlank(message = "Title can't be blank")*/
    private String name;
    /*@Schema(required = true)
    @NotBlank(message = "ImageURL can't be blank")*/
    private Neighborhood neighborhood;
    private String address;
    private Set<Activity> activities;
    private Set<Amenity> amenities;

    public ClubDTO() {
    }
}
