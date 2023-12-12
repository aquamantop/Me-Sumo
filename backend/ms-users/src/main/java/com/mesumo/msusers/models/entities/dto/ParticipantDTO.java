package com.mesumo.msusers.models.entities.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ParticipantDTO {

    private Long userId;

    private String firstName;

    private String lastName;

}
