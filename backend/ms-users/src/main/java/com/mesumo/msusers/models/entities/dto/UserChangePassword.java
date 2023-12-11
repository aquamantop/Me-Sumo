package com.mesumo.msusers.models.entities.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserChangePassword {

    private String email;

    private String oldPassword;

    private String newPassword;

    private String confirmPassword;
}
