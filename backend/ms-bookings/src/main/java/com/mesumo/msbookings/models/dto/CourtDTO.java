package com.mesumo.msbookings.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourtDTO {
    private Long id;
    private String name;
    private int number;
    private String urlImage;
    private CourtType court_type;

    private boolean inside;

    private Set<SlotDTO> slots;

    @Override
    public String toString() {
        return id.toString();
    }
}
