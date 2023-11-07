package com.mesumo.msbookings.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ActivityDTO {

    private Long id;
    private String name;
    private Set<SlotDTO> slots;
}
