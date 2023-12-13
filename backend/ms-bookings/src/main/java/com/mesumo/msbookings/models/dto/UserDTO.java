package com.mesumo.msbookings.models.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {

    private Long id;

    private Role role;

    private String firstName;

    private String lastName;

    private String email;

}
