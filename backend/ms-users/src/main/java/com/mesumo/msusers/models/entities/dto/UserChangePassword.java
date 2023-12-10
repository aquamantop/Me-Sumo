package com.mesumo.msusers.models.entities.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserChangePassword {

    private Long userId;

    private String password;
}
