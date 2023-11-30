package com.mesumo.msusers.auth;

import com.mesumo.msusers.models.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String userName;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Role role;

}